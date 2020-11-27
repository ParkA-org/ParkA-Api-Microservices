import { Module } from '@nestjs/common';
import { ParkingCalendarResolver } from './parking-calendar.resolver';
import { ParkingCalendarService } from './parking-calendar.service';

@Module({
  providers: [ParkingCalendarResolver, ParkingCalendarService],
})
export class ParkingCalendarModule {}
