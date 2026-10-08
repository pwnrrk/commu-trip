import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BookingStatus, TripStatus } from '../common/enums';
import { Trip } from '../trips/entities/trip.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './entities/booking.entity';

/** Seat reservation logic for travelers (PostgreSQL). */
@Injectable()
export class BookingsService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Booking) private readonly bookingRepo: Repository<Booking>,
  ) {}

  /**
   * Reserves seats on an open trip. The trip row is locked for the duration
   * of the transaction so concurrent bookings cannot oversell capacity.
   *
   * @param travelerId - MongoDB id of the booking traveler.
   * @param tripId - Trip UUID.
   * @param dto - Seat count and optional note.
   * @returns The created booking.
   * @throws NotFoundException if the trip does not exist.
   * @throws BadRequestException if the trip is not open or the traveler organizes it.
   * @throws ConflictException if there are not enough free seats or the traveler already has an active booking.
   */
  async create(travelerId: string, tripId: string, dto: CreateBookingDto): Promise<Booking> {
    return this.dataSource.transaction(async (manager) => {
      const trip = await manager.findOne(Trip, {
        where: { id: tripId },
        lock: { mode: 'pessimistic_write' },
      });
      if (!trip) {
        throw new NotFoundException(`Trip ${tripId} not found`);
      }
      if (trip.status !== TripStatus.OPEN) {
        throw new BadRequestException('Trip is not open for booking');
      }
      if (trip.organizerId === travelerId) {
        throw new BadRequestException('Organizers already hold a seat on their own trip');
      }

      const existing = await manager
        .createQueryBuilder(Booking, 'booking')
        .where('booking.tripId = :tripId AND booking.travelerId = :travelerId', {
          tripId,
          travelerId,
        })
        .andWhere('booking.status IN (:...active)', {
          active: [BookingStatus.PENDING, BookingStatus.CONFIRMED],
        })
        .getExists();
      if (existing) {
        throw new ConflictException('You already have an active booking on this trip');
      }

      if (trip.bookedSeats + dto.seats > trip.capacity) {
        throw new ConflictException('Not enough free seats on this trip');
      }

      trip.bookedSeats += dto.seats;
      if (trip.bookedSeats === trip.capacity) {
        trip.status = TripStatus.FULL;
      }
      await manager.save(trip);

      const booking = manager.create(Booking, {
        tripId,
        travelerId,
        seats: dto.seats,
        note: dto.note ?? null,
        status: BookingStatus.PENDING,
      });
      return manager.save(booking);
    });
  }

  /**
   * Lists a traveler's bookings, newest first, with the trip attached.
   *
   * @param travelerId - MongoDB id of the traveler.
   * @returns The traveler's bookings.
   */
  findByTraveler(travelerId: string): Promise<Booking[]> {
    return this.bookingRepo.find({
      where: { travelerId },
      relations: { trip: true },
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Cancels a traveler's own booking and releases its seats. A full trip
   * reopens when seats free up.
   *
   * @param travelerId - MongoDB id of the traveler.
   * @param bookingId - Booking UUID.
   * @returns The cancelled booking.
   * @throws NotFoundException if the booking does not exist.
   * @throws ForbiddenException if the booking belongs to someone else.
   * @throws BadRequestException if the booking is already cancelled or rejected.
   */
  async cancel(travelerId: string, bookingId: string): Promise<Booking> {
    return this.dataSource.transaction(async (manager) => {
      const booking = await manager.findOneBy(Booking, { id: bookingId });
      if (!booking) {
        throw new NotFoundException(`Booking ${bookingId} not found`);
      }
      if (booking.travelerId !== travelerId) {
        throw new ForbiddenException('This booking belongs to another traveler');
      }
      if (![BookingStatus.PENDING, BookingStatus.CONFIRMED].includes(booking.status)) {
        throw new BadRequestException(`Booking is already ${booking.status}`);
      }

      const trip = await manager.findOneOrFail(Trip, {
        where: { id: booking.tripId },
        lock: { mode: 'pessimistic_write' },
      });
      trip.bookedSeats = Math.max(0, trip.bookedSeats - booking.seats);
      if (trip.status === TripStatus.FULL) {
        trip.status = TripStatus.OPEN;
      }
      await manager.save(trip);

      booking.status = BookingStatus.CANCELLED;
      return manager.save(booking);
    });
  }
}


