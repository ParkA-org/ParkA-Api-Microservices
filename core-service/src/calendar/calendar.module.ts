import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarService } from './calendar.service';
import { ParkingCalendar } from './entities/calendar.entity';
import { CalendarController } from './calendar.controller';

@Module({
  providers: [CalendarService],
  imports: [TypeOrmModule.forFeature([ParkingCalendar])],
  controllers: [CalendarController],
})
export class CalendarModule {}
