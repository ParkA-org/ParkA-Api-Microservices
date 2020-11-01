import { Module } from '@nestjs/common';
import { CalendarResolver } from './calendar.resolver';
import { CalendarService } from './calendar.service';

@Module({
  providers: [CalendarService, CalendarResolver],
  exports: [CalendarService],
})
export class CalendarModule {}
