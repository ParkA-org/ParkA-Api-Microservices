import { Module } from '@nestjs/common';
import { VehicleModelModule } from '../vehicle-model/vehicle-model.module';
import { VehicleMakeResolver } from './vehicle-make.resolver';
import { VehicleMakeService } from './vehicle-make.service';

@Module({
  imports: [VehicleModelModule],
  providers: [VehicleMakeService, VehicleMakeResolver],
  exports: [VehicleMakeService],
})
export class VehicleMakeModule {}
