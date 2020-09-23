import { Module } from '@nestjs/common';
import { VehicleMakeResolver } from './vehicle-make.resolver';
import { VehicleMakeService } from './vehicle-make.service';

@Module({
  providers: [VehicleMakeService, VehicleMakeResolver],
  exports: [VehicleMakeService],
})
export class VehicleMakeModule {}
