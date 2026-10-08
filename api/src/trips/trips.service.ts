import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paginated } from '../common/pagination-query.dto';
import { TripStatus, TripType } from '../common/enums';
import { CreateSharedTripDto } from './dto/create-shared-trip.dto';
import { ListTripsQueryDto } from './dto/list-trips-query.dto';
import { Trip } from './entities/trip.entity';

/** Trip discovery and shared-budget trip posting (PostgreSQL). */
@Injectable()
export class TripsService {
  constructor(@InjectRepository(Trip) private readonly tripRepo: Repository<Trip>) {}

  /**
   * Lists open trips matching the given filters, soonest departure first.
   *
   * @param query - Search, filter and pagination options.
   * @returns A page of open trips with the total match count.
   */
  async findOpen(query: ListTripsQueryDto): Promise<Paginated<Trip>> {
    const { page, limit, search, type, difficulty, location, startFrom, startTo, maxPrice } =
      query;

    const qb = this.tripRepo
      .createQueryBuilder('trip')
      .where('trip.status = :status', { status: TripStatus.OPEN });

    if (search) {
      qb.andWhere(
        '(trip.title ILIKE :search OR trip.description ILIKE :search OR trip.location ILIKE :search)',
        { search: `%${search}%` },
      );
    }
    if (type) qb.andWhere('trip.type = :type', { type });
    if (difficulty) qb.andWhere('trip.difficulty = :difficulty', { difficulty });
    if (location) qb.andWhere('trip.location ILIKE :location', { location: `%${location}%` });
    if (startFrom) qb.andWhere('trip.startDate >= :startFrom', { startFrom });
    if (startTo) qb.andWhere('trip.startDate <= :startTo', { startTo });
    if (maxPrice !== undefined) qb.andWhere('trip.pricePerPerson <= :maxPrice', { maxPrice });

    const [items, total] = await qb
      .orderBy('trip.startDate', 'ASC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { items, total, page, limit };
  }

  /**
   * Loads a single trip by id.
   *
   * @param id - Trip UUID.
   * @returns The trip.
   * @throws NotFoundException if no trip has that id.
   */
  async findById(id: string): Promise<Trip> {
    const trip = await this.tripRepo.findOneBy({ id });
    if (!trip) {
      throw new NotFoundException(`Trip ${id} not found`);
    }
    return trip;
  }

  /**
   * Publishes a shared-budget trip on behalf of a traveler. The organizer
   * occupies the first seat.
   *
   * @param organizerId - MongoDB id of the posting traveler.
   * @param dto - Trip details.
   * @returns The created trip.
   * @throws BadRequestException if the dates are inconsistent.
   */
  async createShared(organizerId: string, dto: CreateSharedTripDto): Promise<Trip> {
    if (dto.endDate < dto.startDate) {
      throw new BadRequestException('endDate must not be before startDate');
    }
    if (dto.startDate < new Date()) {
      throw new BadRequestException('startDate must be in the future');
    }

    const trip = this.tripRepo.create({
      ...dto,
      type: TripType.SHARED_BUDGET,
      status: TripStatus.OPEN,
      bookedSeats: 1,
      organizerId,
      tags: dto.tags ?? [],
      meetingPoint: dto.meetingPoint ?? null,
      coverImageUrl: dto.coverImageUrl ?? null,
    });
    return this.tripRepo.save(trip);
  }
}


