import { Module } from '@nestjs/common';
import { ParkingServiceController } from './parking-service.controller';
import { ParkingServiceService } from './parking-service.service';

@Module({
  controllers: [ParkingServiceController],
  providers: [ParkingServiceService]
})
export class ParkingServiceModule {}
