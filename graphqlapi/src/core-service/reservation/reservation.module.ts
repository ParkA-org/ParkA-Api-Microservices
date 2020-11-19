import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth-service/auth.module';
import { ParkingModule } from 'src/parking-service/parking/parking.module';
import { PaymentModule } from 'src/payment-service/payment/payment.module';
import { VehicleModule } from 'src/vehicle-service/vehicle/vehicle.module';
import { ReservationResolver } from './reservation.resolver';
import { ReservationService } from './reservation.service';

@Module({
  imports: [VehicleModule, PaymentModule, ParkingModule, AuthModule],
  exports: [ReservationService],
  providers: [ReservationResolver, ReservationService],
})
export class ReservationModule {}
