import { Injectable, Logger } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { GetCalendarByIdInput } from './inputs/get-calendar-by-id.input';
import { UpdateCalendarInput } from './inputs/update-calendar.input';
import { CalendarType } from './types/calendar.type';

@Injectable()
export class CalendarService {
  private logger = new Logger('ParkingService');
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: { url: `${process.env.REDIS_URL}` },
    });
  }

  public async getCalendarById(
    getCalendarByIdInput: GetCalendarByIdInput,
  ): Promise<CalendarType> {
    this.logger.debug(
      `Received get calendar by id with payload ${JSON.stringify(
        getCalendarByIdInput,
      )}`,
    );

    const response = await this.client.send<CalendarType>(
      { type: 'get-calendar-by-id' },
      getCalendarByIdInput,
    );

    return response.toPromise();
  }

  public async updateCalendar(
    updateCalendarInput: UpdateCalendarInput,
  ): Promise<CalendarType> {
    this.logger.debug(
      `Received update calendar with payload ${JSON.stringify(
        updateCalendarInput,
      )}`,
    );

    const response = await this.client.send<CalendarType>(
      { type: 'update-calendar' },
      updateCalendarInput,
    );

    return response.toPromise();
  }
}
