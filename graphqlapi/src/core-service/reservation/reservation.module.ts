import { Module } from '@nestjs/common';
import { ReservationResolver } from './reservation.resolver';
import { ReservationService } from './reservation.service';

@Module({
  imports: [],
  exports: [],
  providers: [ReservationResolver, ReservationService],
})
export class ReservationModule {}
