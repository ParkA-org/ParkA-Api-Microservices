import { Module } from '@nestjs/common';
import { VehicleServiceResolver } from './vehicle-service.resolver';
import { VehicleServiceService } from './vehicle-service.service';

@Module({
  providers: [VehicleServiceResolver, VehicleServiceService],
})
export class VehicleServiceModule {}
