import { Module } from '@nestjs/common';
import { VehicleModelResolver } from './vehicle-model.resolver';
import { VehicleModelService } from './vehicle-model.service';

@Module({
  providers: [VehicleModelResolver, VehicleModelService],
})
export class VehicleModelModule {}
