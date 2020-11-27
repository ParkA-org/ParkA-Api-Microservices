import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { ParkingCalendar } from 'src/calendar/entities/calendar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, ParkingCalendar])],
  providers: [ReservationService],
  controllers: [ReservationController],
})
export class ReservationModule {}
