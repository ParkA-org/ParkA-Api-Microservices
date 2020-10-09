import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parking } from './entities/parking.entity';
import { ParkingController } from './parking.controller';
import { ParkingService } from './parking.service';

@Module({
  controllers: [ParkingController],
  providers: [ParkingService],
  imports: [TypeOrmModule.forFeature([Parking])],
})
export class ParkingModule {}
