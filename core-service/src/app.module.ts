import { Module } from '@nestjs/common';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [ReservationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
