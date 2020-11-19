import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarModule } from 'src/calendar/calendar.module';
import { Calendar } from 'src/calendar/entities/calendar.entity';
import { Parking } from './entities/parking.entity';
import { ParkingController } from './parking.controller';
import { ParkingService } from './parking.service';

@Module({
  controllers: [ParkingController],
  providers: [ParkingService],
  imports: [TypeOrmModule.forFeature([Parking, Calendar]), CalendarModule],
})
export class ParkingModule {}
