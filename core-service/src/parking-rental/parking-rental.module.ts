import { Module } from '@nestjs/common';
import { ParkingRentalController } from './parking-rental.controller';
import { ParkingRentalService } from './parking-rental.service';

@Module({
  controllers: [ParkingRentalController],
  providers: [ParkingRentalService]
})
export class ParkingRentalModule {}
