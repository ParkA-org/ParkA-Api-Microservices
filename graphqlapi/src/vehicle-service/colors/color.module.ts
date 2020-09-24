import { Module } from '@nestjs/common';
import { VehicleColorResolver } from './vehicle-color.resolver';
import { ColorService } from './vehicle-color.service';

@Module({
  providers: [VehicleColorResolver, ColorService],
  exports: [ColorService],
})
export class VehicleColorModule {}
