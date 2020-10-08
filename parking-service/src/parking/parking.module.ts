import { Module } from '@nestjs/common';
import { ParkingController } from './parking.controller';
import { ParkingService } from './parking.service';

@Module({
  controllers: [ParkingController],
  providers: [ParkingService]
})
export class ParkingModule {}
