import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CalendarService } from './calendar.service';
import { GetParkingCalendarDto } from './dtos/get-parking-calendar.dto';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @MessagePattern({ type: 'get-parking-avaliability' })
  public async getParkingAvaliability(
    getParkingCalendarDto: GetParkingCalendarDto,
  ) {
    return this.calendarService.getParkingAvaliability(getParkingCalendarDto);
  }
}
