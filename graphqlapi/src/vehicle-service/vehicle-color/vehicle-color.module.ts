import { Module } from '@nestjs/common';
import { VehicleColorResolver } from './vehicle-color.resolver';
import { VehicleColorService } from './vehicle-color.service';

@Module({
  providers: [VehicleColorResolver, VehicleColorService],
})
export class VehicleColorModule {}
