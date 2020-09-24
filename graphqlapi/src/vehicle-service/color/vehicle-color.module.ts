import { Module } from '@nestjs/common';
import { VehicleColorResolver } from './vehicle-color.resolver';
import { VehicleColorService } from './vehicle-color.service';

@Module({
  providers: [VehicleColorResolver, VehicleColorService],
  exports: [VehicleColorService],
})
export class VehicleColorModule {}
