import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './entities/trip.entity';
import { TripsService } from './trips.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trip])],
  providers: [TripsService],
  exports: [TripsService, TypeOrmModule],
})
export class TripsModule {}


