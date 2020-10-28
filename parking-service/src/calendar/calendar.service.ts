import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCalendarDto } from './dtos/create-calendar.dto';
import { Calendar } from './entities/calendar.entity';
import { v4 as uuid } from 'uuid';
import { GetCalendarByIdDto } from './dtos/get-calendar-by-id.dto';
import { UpdateCalendarDto } from './dtos/update-calendar.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(Calendar)
    private calendarRepository: Repository<Calendar>,
  ) {}

  public async getCalendarById(
    getCalendarByIdDto: GetCalendarByIdDto,
  ): Promise<Calendar> {
    const calendar = await this.calendarRepository.findOne(getCalendarByIdDto);

    if (!calendar) {
      throw new RpcException('Entry not found');
    }

    return calendar;
  }

  public async createCalendar(
    createCalendarDto: CreateCalendarDto,
  ): Promise<Calendar> {
    const {
      friday,
      monday,
      parkingId,
      saturday,
      sunday,
      thursday,
      tuesday,
      wednesday,
    } = createCalendarDto;

    const caledar = this.calendarRepository.create({
      id: uuid(),
      parkingId,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return this.calendarRepository.save(caledar);
  }

  public async updateCalendar(
    updateCalendarDto: UpdateCalendarDto,
  ): Promise<Calendar> {
    const { calendarId, updateCalendarPayload } = updateCalendarDto;

    const calendar = await this.getCalendarById(calendarId);

    calendar.updatedAt = new Date().toISOString();

    return this.calendarRepository.save(calendar);
  }
}
