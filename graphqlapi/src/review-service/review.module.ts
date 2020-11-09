import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth-service/auth.module';
import { ReservationModule } from 'src/core-service/reservation/reservation.module';
import { ParkingModule } from 'src/parking-service/parking/parking.module';
import { ReviewService } from './review.service';

@Module({
  imports: [AuthModule, ReservationModule, ParkingModule],
  controllers: [],
  providers: [ReviewService],
})
export class ReviewModule {}
