import { Module } from '@nestjs/common';
import { ParkingModule } from 'src/parking-service/parking/parking.module';
import { PaymentModule } from 'src/payment-service/payment/payment.module';
import { VehicleModule } from 'src/vehicle-service/vehicle/vehicle.module';
import { CountryModule } from '../country/country.module';
import { NationalityModule } from '../nationality/nationality.module';
import { UserInformationResolver } from './user-information.resolver';
import { UserInformationService } from './user-information.service';

@Module({
  imports: [
    CountryModule,
    NationalityModule,
    PaymentModule,
    ParkingModule,
    VehicleModule,
  ],
  exports: [UserInformationService],
  providers: [UserInformationResolver, UserInformationService],
})
export class UserInformationModule {}
