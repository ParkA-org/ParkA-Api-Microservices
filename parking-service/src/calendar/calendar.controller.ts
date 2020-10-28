import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CalendarService } from './calendar.service';
import { UpdateCalendarDto } from './dtos/update-calendar.dto';
import { Calendar } from './entities/calendar.entity';

@Controller('calendar')
export class CalendarController {
  constructor(private calendarService: CalendarService) {}

  @MessagePattern({ type: 'update-calendar' })
  public async updateCalendar(
    updateCalendarDto: UpdateCalendarDto,
  ): Promise<Calendar> {
    return this.calendarService.updateCalendar(updateCalendarDto);
  }
}
