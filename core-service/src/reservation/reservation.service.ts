import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetReservationByIdDto } from './dtos/get-reservation-by-id.dto';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dtos/create-reservation.dto';
import { UpdateReservationDto } from './dtos/update-reservation.dto';
import { v4 as uuid } from 'uuid';
import {
  CancelReservationDto,
  ValidaUserDto,
} from './dtos/cancel-reservation.dto';
import { ReservationStatuses } from './utils/statuses';
import { GetAllUserReservations } from './dtos/get-all-user-reservations.dto';
import { UserRoles } from './utils/user-roles';
import { ParkingCalendar } from 'src/calendar/entities/calendar.entity';
import { Schedule } from 'src/calendar/entities/schedule.entity';

@Injectable()
export class ReservationService {
  private logger = new Logger('ReservationService');

  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectRepository(ParkingCalendar)
    private calendarRepository: Repository<ParkingCalendar>,
  ) {}

  public async getReservationById(
    getReservationByIdDto: GetReservationByIdDto,
  ): Promise<Reservation> {
    this.logger.debug(
      `Received get reservation with payload ${JSON.stringify(
        getReservationByIdDto,
      )}`,
    );

    const result = await this.reservationRepository.findOne(
      getReservationByIdDto,
    );

    if (!result) {
      throw new RpcException('Entry not found');
    }

    return result;
  }

  public async getAllReservations(): Promise<Reservation[]> {
    this.logger.debug(`Received get all reservations`);

    return this.reservationRepository.find();
  }

  public async getAllUserReservationsAsClient(
    getAllUserReservations: GetAllUserReservations,
  ): Promise<Reservation[]> {
    this.logger.debug(`Received get all user reservations`);

    const { id, role } = getAllUserReservations;

    if (role === UserRoles.Client) {
      return this.reservationRepository.find({
        where: {
          client: id,
        },
      });
    }

    if (role === UserRoles.Owner) {
      return this.reservationRepository.find({
        where: {
          owner: id,
        },
      });
    }

    return [];
  }

  //TODO: implement creation logic
  public async createReservation(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    this.logger.debug(
      `Received create reservation with payload ${JSON.stringify(
        createReservationDto,
      )}`,
    );

    const {
      checkInDate,
      checkOutDate,
      client,
      owner,
      parking,
      paymentInfo,
      rentDate,
      total,
      vehicle,
    } = createReservationDto;

    if (client === owner) {
      throw new RpcException('User cannot rent his own parking');
    }

    const reservation = this.reservationRepository.create({
      id: uuid(),
      checkInDate,
      checkOutDate,
      client,
      owner,
      parking,
      paymentInfo,
      rentDate,
      status: ReservationStatuses.Created,
      total,
      vehicle,
      reviewed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    await this.createCalendarEntries(reservation);

    return this.reservationRepository.save(reservation);
  }

  private async createCalendarEntries(reservation: Reservation) {
    const { checkInDate, checkOutDate, id, parking } = reservation;

    const extractedCheckInDate = this.extractDateTime(checkInDate);
    const extractedCheckOutDate = this.extractDateTime(checkOutDate);

    const { time: startTime } = extractedCheckInDate;
    const { time: endTime } = extractedCheckOutDate;

    const { day, month, year } = extractedCheckInDate.date;

    const reservationDate = new Date(year, month - 1, day).toISOString();

    console.log(reservationDate);

    const parkingCalendar = await this.calendarRepository.findOne({
      parking,
      date: reservationDate,
    });

    const _parkingCalendar = this.calendarRepository.create({
      id: uuid(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      date: reservationDate,
      parking,
      schedules: [],
    });

    const calendar: ParkingCalendar = parkingCalendar
      ? parkingCalendar
      : _parkingCalendar;

    const schedule: Schedule = {
      finish: endTime,
      reservation: id,
      start: startTime,
    };

    const originalSchedule = calendar.schedules;

    const canCreate = this.checkScheduleCreation(schedule, originalSchedule);

    if (canCreate) {
      calendar.schedules.push(schedule);

      calendar.schedules.sort((_schedule1, _schedule2) => {
        if (_schedule1.start < _schedule2.start) {
          return -1;
        }

        if (_schedule1.start > _schedule2.start) {
          return 1;
        }

        return 0;
      });

      return this.calendarRepository.save(calendar);
    } else {
      throw new RpcException('Cannot create reservation in this schedule');
    }
  }

  private checkScheduleCreation(
    _scheduleToCheck: Schedule,
    _scheduleList: Schedule[],
  ) {
    for (const el of _scheduleList) {
      if (
        _scheduleToCheck.start < el.start &&
        _scheduleToCheck.finish <= el.start
      ) {
        break;
      } else if (_scheduleToCheck.start >= el.finish) {
        continue;
      } else {
        return false;
      }
    }

    return true;
  }

  private getTotalDaysOfReservation(
    checkInDateObject: ICalendarDate,
    checkOutDateObject: ICalendarDate,
  ): number {
    const months: number[] = [];

    const { month: checkOutMonth, year: checkOutYear } = checkOutDateObject;

    let monthPointer = checkInDateObject.month;
    let yearPointer = checkInDateObject.year;
    while (monthPointer <= checkOutMonth && yearPointer <= checkOutYear) {
      const element: ICalendarDate = {
        day: 0,
        month: monthPointer,
        year: yearPointer,
      };
      months.push(this.getNumberOfDaysInMonth(element));
      monthPointer++;
      yearPointer++;

      monthPointer = monthPointer === 13 ? 1 : monthPointer;
    }

    const totalDays = months.reduce((total, value, idx) => {
      if (idx == 0) {
        value -= checkInDateObject.day;
      } else if (idx == months.length - 1) {
        value -= checkOutDateObject.day;
      }

      return total + value;
    }, 1);

    return totalDays;
  }

  private getNumberOfDaysInMonth(dateObject: ICalendarDate) {
    const { day, year, month } = dateObject;

    return new Date(year, month - 1, day).getDate();
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

  public async updateReservation(
    updateReservationDto: UpdateReservationDto,
  ): Promise<Reservation> {
    const { data, where } = updateReservationDto;

    const reservation = await this.getReservationById(where);

    const fieldsToUpdate = Object.keys(data);

    const {
      checkInDate: checkInDateToUpdate,
      checkOutDate: checkOutDateToUpdate,
    } = data;

    if (
      (checkInDateToUpdate !== undefined &&
        checkOutDateToUpdate === undefined) ||
      (checkInDateToUpdate === undefined && checkOutDateToUpdate !== undefined)
    ) {
      throw new Error(
        'When Updating check in date, checkout date cannot be undefined and viceversa',
      );
    }

    for (const field of fieldsToUpdate) {
      reservation[field] = data[field];
    }

    const { id, checkInDate, parking, checkOutDate } = reservation;

    const extractDateTime = this.extractDateTime(checkInDate);
    const { day, month, year } = extractDateTime.date;

    const reservationDate = new Date(year, month - 1, day).toISOString();

    const parkingCalendar = await this.calendarRepository.findOne({
      parking,
      date: reservationDate,
    });

    const extractedCheckInDate = this.extractDateTime(checkInDate);
    const extractedCheckOutDate = this.extractDateTime(checkOutDate);

    const { time: startTime } = extractedCheckInDate;
    const { time: endTime } = extractedCheckOutDate;

    const _schedules = parkingCalendar.schedules.filter(
      el => el.reservation != id,
    );

    const schedule: Schedule = {
      finish: endTime,
      reservation: id,
      start: startTime,
    };

    const canCreate = this.checkScheduleCreation(schedule, _schedules);

    parkingCalendar.schedules = _schedules;

    if (canCreate) {
      parkingCalendar.schedules.push(schedule);

      parkingCalendar.schedules.sort((_schedule1, _schedule2) => {
        if (_schedule1.start < _schedule2.start) {
          return -1;
        }

        if (_schedule1.start > _schedule2.start) {
          return 1;
        }

        return 0;
      });

      reservation.updatedAt = new Date().toISOString();

      return this.reservationRepository.save(reservation);
    } else {
      throw new RpcException('Cannot update reservation with this schedule');
    }
  }

  public async cancelReservation(
    cancelReservationDto: CancelReservationDto,
    user: ValidaUserDto,
  ): Promise<Reservation> {
    const reservation = await this.getReservationById(cancelReservationDto);

    if (reservation.client != user.id && reservation.owner != user.id) {
      throw new RpcException('Entry not found');
    }

    const { id, checkInDate, parking } = reservation;

    const extractDateTime = this.extractDateTime(checkInDate);
    const { day, month, year } = extractDateTime.date;

    const reservationDate = new Date(year, month - 1, day).toISOString();

    reservation.status = ReservationStatuses.Cancelled;

    const parkingCalendar = await this.calendarRepository.findOne({
      parking,
      date: reservationDate,
    });

    const _schedules = parkingCalendar.schedules.filter(
      el => el.reservation != id,
    );

    parkingCalendar.schedules = _schedules;

    await this.calendarRepository.save(parkingCalendar);

    return this.reservationRepository.save(reservation);
  }
}
