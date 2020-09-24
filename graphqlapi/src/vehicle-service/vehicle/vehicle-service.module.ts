import { Module } from '@nestjs/common';
import { ColorModule } from '../colors/color.module';
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
    ColorModule,
  ],
  providers: [VehicleServiceResolver, VehicleServiceService],
})
export class VehicleServiceModule {}
