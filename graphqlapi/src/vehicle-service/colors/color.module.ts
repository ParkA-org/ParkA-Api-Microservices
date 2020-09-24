import { Module } from '@nestjs/common';
import { VehicleColorResolver } from './color.resolver';
import { ColorService } from './color.service';

@Module({
  providers: [VehicleColorResolver, ColorService],
  exports: [ColorService],
})
export class VehicleColorModule {}
