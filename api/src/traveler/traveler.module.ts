import { Module } from '@nestjs/common';
import { BookingsModule } from '../bookings/bookings.module';
import { TripsModule } from '../trips/trips.module';
import { UsersModule } from '../users/users.module';
import { TravelerController } from './traveler.controller';

@Module({
  imports: [TripsModule, BookingsModule, UsersModule],
  controllers: [TravelerController],
})
export class TravelerModule {}


