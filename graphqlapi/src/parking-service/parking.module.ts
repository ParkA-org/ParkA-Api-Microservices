import { Module } from '@nestjs/common';
import { ParkingServiceController } from './parking.controller';
import { ParkingServiceService } from './parking.service';

@Module({
  controllers: [ParkingServiceController],
  providers: [ParkingServiceService],
})
export class ParkingServiceModule {}
