import { Module } from '@nestjs/common';
import { VehicleColorModule } from '../colors/color.module';
import { VehicleMakeModule } from '../vehicle-make/vehicle-make.module';
import { VehicleModelModule } from '../vehicle-model/vehicle-model.module';
import { VehicleTypeModule } from '../vehicle-type/vehicle-type.module';
import { VehicleServiceResolver } from './vehicle-service.resolver';
import { VehicleServiceService } from './vehicle-service.service';

@Module({
  imports: [
    VehicleTypeModule,
    VehicleModelModule,
    VehicleMakeModule,
    VehicleColorModule,
  ],
  providers: [VehicleServiceResolver, VehicleServiceService],
})
export class VehicleServiceModule {}
