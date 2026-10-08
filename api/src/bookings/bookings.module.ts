import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripsModule } from '../trips/trips.module';
import { BookingsService } from './bookings.service';
import { Booking } from './entities/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), TripsModule],
  providers: [BookingsService],
  exports: [BookingsService],
})
export class BookingsModule {}


