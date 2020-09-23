import { Module } from '@nestjs/common';
import { VehicleTypeResolver } from './vehicle-type.resolver';
import { VehicleTypeService } from './vehicle-type.service';

@Module({
  providers: [VehicleTypeResolver, VehicleTypeService],
  exports: [VehicleTypeService],
})
export class VehicleTypeModule {}
