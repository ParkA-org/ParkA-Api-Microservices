import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetParkingCalendarDto } from './dtos/get-parking-calendar.dto';
import { ParkingCalendar } from './entities/calendar.entity';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(ParkingCalendar)
    private readonly calendarRepository: Repository<ParkingCalendar>,
  ) {}

  public async getParkingAvaliability(
    getParkingCalendarDto: GetParkingCalendarDto,
  ): Promise<ParkingCalendar[]> {
    const { date, parking } = getParkingCalendarDto;

    const extractedDate = this.extractDateTime(date);
    const { day, month, year } = extractedDate.date;

    const reservationDate = new Date(year, month, day).toISOString();

    const filterObject = {
      where: {
        parking,
        date: { $gte: reservationDate },
      },
    };

    const result = await this.calendarRepository.find(filterObject);

    const formattedResult = result.map(el => {
      el.schedules = this.getFormattedSchedule(el.schedules);
      return el;
    });

    return formattedResult;
  }

  private getFormattedSchedule(_toFormat: Schedule[]): Schedule[] {
    const ret: Schedule[] = [];

    const len = _toFormat.length;

    if (len === 0) return [];

    if (len === 1) return _toFormat;

    let _current: Schedule = _toFormat[0];

    for (let i = 1; i < len; i++) {
      if (_current.finish === _toFormat[i].start) {
        _current.finish = _toFormat[i].finish;
      } else {
        ret.push(_current);
        _current = _toFormat[i];
      }
    }

    ret.push(_current);

    return ret;
  }

  private extractDateTime(dateTime: string): ICalendarDateTimeDto {
    const _splittedDateTime = dateTime.split('T');

    const _date = _splittedDateTime[0];
    const _time = _splittedDateTime[1];

    const _splittedDate = _date.split('-');
    const _splittedTime = _time.split(':');

    const date = {
      day: parseInt(_splittedDate[2]),
      month: parseInt(_splittedDate[1]),
      year: parseInt(_splittedDate[0]),
    };

    const time = parseInt(`${_splittedTime[0]}${_splittedTime[1]}`);

    return {
      time,
      date,
    };
  }
}
