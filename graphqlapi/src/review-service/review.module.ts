import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth-service/auth.module';
import { ReservationModule } from 'src/core-service/reservation/reservation.module';
import { ParkingModule } from 'src/parking-service/parking/parking.module';
import { ReviewResolver } from './review.resolver';
import { ReviewService } from './review.service';

@Module({
  imports: [forwardRef(() => AuthModule), ReservationModule, ParkingModule],
  controllers: [],
  providers: [ReviewService, ReviewResolver],
  exports: [ReviewService],
})
export class ReviewModule {}
