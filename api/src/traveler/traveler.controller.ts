import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BookingsService } from '../bookings/bookings.service';
import { CreateBookingDto } from '../bookings/dto/create-booking.dto';
import { CurrentUserId } from '../common/current-user-id.decorator';
import { CreateSharedTripDto } from '../trips/dto/create-shared-trip.dto';
import { ListTripsQueryDto } from '../trips/dto/list-trips-query.dto';
import { TripsService } from '../trips/trips.service';
import { UsersService } from '../users/users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

/** Endpoints consumed by the traveler frontend. */
@Controller('traveler')
export class TravelerController {
  constructor(
    private readonly tripsService: TripsService,
    private readonly bookingsService: BookingsService,
    private readonly usersService: UsersService,
  ) {}

  @Get('trips')
  listTrips(@Query() query: ListTripsQueryDto) {
    return this.tripsService.findOpen(query);
  }

  @Get('trips/:id')
  getTrip(@Param('id', ParseUUIDPipe) id: string) {
    return this.tripsService.findById(id);
  }

  @Post('trips')
  postSharedTrip(@CurrentUserId() userId: string, @Body() dto: CreateSharedTripDto) {
    return this.tripsService.createShared(userId, dto);
  }

  @Post('trips/:id/bookings')
  bookTrip(
    @CurrentUserId() userId: string,
    @Param('id', ParseUUIDPipe) tripId: string,
    @Body() dto: CreateBookingDto,
  ) {
    return this.bookingsService.create(userId, tripId, dto);
  }

  @Get('bookings')
  listMyBookings(@CurrentUserId() userId: string) {
    return this.bookingsService.findByTraveler(userId);
  }

  @Patch('bookings/:id/cancel')
  cancelBooking(
    @CurrentUserId() userId: string,
    @Param('id', ParseUUIDPipe) bookingId: string,
  ) {
    return this.bookingsService.cancel(userId, bookingId);
  }

  @Get('me')
  getProfile(@CurrentUserId() userId: string) {
    return this.usersService.findById(userId);
  }

  @Patch('me')
  updateProfile(@CurrentUserId() userId: string, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateProfile(userId, dto);
  }
}


