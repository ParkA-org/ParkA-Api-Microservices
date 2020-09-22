import { Module } from '@nestjs/common';
import { VehicleTypeResolver } from './vehicle-type.resolver';

@Module({
  providers: [VehicleTypeResolver],
})
export class VehicleTypeModule {}
