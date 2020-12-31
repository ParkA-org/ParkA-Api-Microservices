import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetReservationByIdDto } from './dtos/get-reservation-by-id.dto';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dtos/create-reservation.dto';
import { UpdateReservationDto } from './dtos/update-reservation.dto';
import { v4 as uuid } from 'uuid';
import { CancelReservationDto } from './dtos/cancel-reservation.dto';
import { ReservationStatuses } from './utils/statuses';
import { GetAllUserReservations } from './dtos/get-all-user-reservations.dto';
import { UserRoles } from './utils/user-roles';
import { ParkingCalendar } from 'src/calendar/entities/calendar.entity';
import { Schedule } from 'src/calendar/entities/schedule.entity';
import { UpdateReservationFromCronJobDto } from './dtos/update-reservation-from-cron-job.dto';
import { TaskDto } from 'src/schedule/dtos/task.dto';
import { TasksService } from 'src/schedule/task.service';
import { ReservationInsights } from './entities/reservations-insights.type';
import { GetReservationsInsightsInput } from './dtos/get-reservations-insights.dto';
@Injectable()
export class ReservationService {
  private logger = new Logger('ReservationService');

  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectRepository(ParkingCalendar)
    private calendarRepository: Repository<ParkingCalendar>,
    private taskService: TasksService,
  ) {}
  x;

  public async getReservationById(
    getReservationByIdDto: GetReservationByIdDto,
  ): Promise<Reservation> {
    this.logger.debug(
      `Received get reservation with payload ${JSON.stringify(
        getReservationByIdDto,
      )}`,
    );

    const result = await this.reservationRepository.findOne({
      id: getReservationByIdDto.id,
    });

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

  public async getUserReservationInsights(
    getReservationInsightsInputs: GetReservationsInsightsInput,
  ): Promise<ReservationInsights> {
    const millisecondsToHours = 60 * 60 * 1000;
    const weekDays: string[] = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];

    const months: string[] = [
      'january',
      'february',
      'march',
      'april',
      'may',
      'june',
      'july',
      'august',
      'september',
      'october',
      'november',
      'december',
    ];

    const { owner, year } = getReservationInsightsInputs;

    const startDate = new Date(year, 0, 1).toISOString();
    const endDate = new Date(year + 1, 0, 1).toISOString();

    const userReservations = await this.reservationRepository.find({
      where: {
        owner,
        rentDate: { $gte: startDate, $lte: endDate },
        status: ReservationStatuses.Completed,
      },
    });

    let total: number = 0;
    let totalTime: number = 0;

    const perDayReservations = {
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 0,
      sunday: 0,
    };

    const perMonthReservations = {
      january: 0,
      february: 0,
      march: 0,
      april: 0,
      may: 0,
      june: 0,
      july: 0,
      august: 0,
      september: 0,
      october: 0,
      november: 0,
      december: 0,
    };

    const perMonthEarning = {
      january: 0,
      february: 0,
      march: 0,
      april: 0,
      may: 0,
      june: 0,
      july: 0,
      august: 0,
      september: 0,
      october: 0,
      november: 0,
      december: 0,
    };

    const totalReservations = userReservations.length;

    //
    userReservations.forEach((res: Reservation) => {});

    userReservations.forEach((res: Reservation) => {
      const startDate = new Date(res.checkInDate);
      const endDate = new Date(res.checkOutDate);

      const weekDayIdx = startDate.getUTCDay();
      const weekDay = weekDays[weekDayIdx];
      const monthIdx = startDate.getUTCMonth();
      const month = months[monthIdx];

      //build total in year
      total += res.total;

      //add reservation to weekDay
      perDayReservations[weekDay]++;

      //add reservation to month
      perMonthReservations[month]++;

      //add earning to month
      perMonthEarning[month] += res.total;

      const totalReservationTime = endDate.getTime() - startDate.getTime();

      totalTime += totalReservationTime / millisecondsToHours;
    });

    const reservationTimeAverige: number = Number.parseFloat(
      (totalReservations != 0 ? totalTime / totalReservations : 0).toPrecision(
        2,
      ),
    );

    const result: ReservationInsights = {
      totalEarnings: total,
      reservationTimeAverige: reservationTimeAverige,
      perDayReservations,
      perMonthEarning,
      perMonthReservations,
    };

    return result;
  }

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

    await this.createNewJobs(reservation);
    await this.createCalendarEntries(reservation);

    return this.reservationRepository.save(reservation);
  }

  private async createNewJobs(reservation: Reservation) {
    const task = new TaskDto();
    task.parking = reservation.parking;
    task.reservation = reservation.id;
    task.startTime = reservation.checkInDate;
    task.endTime = reservation.checkOutDate;
    task.name = reservation.id;
    task.type = true;
    this.taskService.addCronJobParking(task);
    task.type = false;
    task.name += ':deleted';
    this.taskService.addCronJobParking(task);
  }

  private async createCalendarEntries(
    reservation: Reservation,
  ): Promise<ParkingCalendar> {
    const { checkInDate, checkOutDate, id, parking } = reservation;

    const extractedCheckInDate = this.extractDateTime(checkInDate);
    const extractedCheckOutDate = this.extractDateTime(checkOutDate);

    const { time: startTime } = extractedCheckInDate;
    const { time: endTime } = extractedCheckOutDate;

    const { day, month, year } = extractedCheckInDate.date;

    const reservationDate = new Date(year, month - 1, day).toISOString();

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
      throw new RpcException(
        'Cannot create or update reservation in this schedule',
      );
    }
  }

  private async deleteOldSchedule(
    reservation: Reservation,
    oldDate: string,
  ): Promise<ParkingCalendar> {
    try {
      const { id, parking } = reservation;

      const parkingCalendar = await this.calendarRepository.findOne({
        parking,
        date: oldDate,
      });

      const originalSchedule = parkingCalendar.schedules;
      let schedule = new Schedule();
      for (const el of originalSchedule) {
        if (id == el.reservation) {
          schedule = el;
          break;
        }
      }
      if (schedule.reservation == undefined) {
        throw new RpcException(
          'Cannot create or update reservation in this schedule',
        );
      }

      let indice = originalSchedule.indexOf(schedule);
      if (indice > -1) {
        originalSchedule.splice(indice, 1);
      }
      parkingCalendar.schedules = originalSchedule;

      return this.calendarRepository.save(parkingCalendar);
    } catch {
      throw new RpcException(
        'Cannot create or update reservation in this schedule',
      );
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

    if (
      reservation.status == ReservationStatuses.Completed ||
      reservation.status == ReservationStatuses.InProgress ||
      reservation.status == ReservationStatuses.Cancelled
    ) {
      throw new RpcException(`This reservation is ${reservation.status}`);
    }

    const {
      checkInDate: checkInDateToUpdate,
      checkOutDate: checkOutDateToUpdate,
    } = data;

    if (
      checkInDateToUpdate === undefined ||
      checkOutDateToUpdate === undefined
    ) {
      throw new Error(
        'When Updating check in date, checkout date cannot be undefined and viceversa',
      );
    }

    if (await this.validateDate(checkInDateToUpdate)) {
      throw new RpcException(
        'This date cannot be set because it is a date in the past',
      );
    }

    const oldDate = reservation.checkInDate;

    const extractOldDateTime = this.extractDateTime(oldDate);

    const reservatioOldDate = new Date(
      extractOldDateTime.date.year,
      extractOldDateTime.date.month - 1,
      extractOldDateTime.date.day,
    ).toISOString();

    for (const field of fieldsToUpdate) {
      reservation[field] = data[field];
    }

    const { id, checkInDate, parking, checkOutDate } = reservation;

    const extractDateTime = this.extractDateTime(checkInDate);
    const { day, month, year } = extractDateTime.date;

    const reservationDate = new Date(year, month - 1, day).toISOString();

    let parkingCalendar = await this.calendarRepository.findOne({
      parking,
      date: reservationDate,
    });

    if (parkingCalendar == undefined) {
      parkingCalendar = await this.createCalendarEntries(reservation);
      await this.deleteOldSchedule(reservation, reservatioOldDate);
    }

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

      await this.taskService.deleteCron(reservation.id);
      await this.taskService.deleteCron(reservation.id + ':deleted');
      await this.createNewJobs(reservation);
      parkingCalendar.updatedAt = new Date().toISOString();
      reservation.updatedAt = new Date().toISOString();
      this.calendarRepository.save(parkingCalendar);
      return this.reservationRepository.save(reservation);
    } else {
      throw new RpcException('Cannot update reservation with this schedule');
    }
  }

  private async validateDate(tomorrow: string): Promise<boolean> {
    const today = new Date().toLocaleString('en-US', {
      timeZone: 'America/Santo_Domingo',
    });

    const todayDate = today.split(', ')[0].split('/');
    const todayTime = today.split(', ')[1].split(':');
    const newDate = tomorrow.split('T')[0].split('-');
    const newTime = tomorrow.split('T')[1].split(':');
    if (parseInt(newDate[0]) == parseInt(todayDate[2])) {
      if (parseInt(newDate[1]) == parseInt(todayDate[0])) {
        if (parseInt(newDate[2]) == parseInt(todayDate[1])) {
          let hoursTime = parseInt(todayTime[0]);
          if (todayTime[2].split(' ')[1] == 'PM') {
            hoursTime += 12;
          }
          if (parseInt(newTime[0]) == hoursTime) {
            if (parseInt(newTime[1]) > parseInt(todayTime[1])) {
              console.log(parseInt(newTime[1]));
              console.log(parseInt(todayTime[1]));
              return false;
            }
          }
          if (parseInt(newTime[0]) > hoursTime) {
            return false;
          }
        }
        if (parseInt(newDate[2]) > parseInt(todayDate[1])) {
          return false;
        }
      }
      if (parseInt(newDate[1]) > parseInt(todayDate[0])) {
        return false;
      }
    }
    if (parseInt(newDate[0]) > parseInt(todayDate[2])) {
      return false;
    }
    return true;
  }

  public async updateReservationFromCronJob(
    updateReservationFromCronJobDto: UpdateReservationFromCronJobDto,
  ): Promise<Reservation> {
    const { reservation, type } = updateReservationFromCronJobDto;

    const data = await this.reservationRepository.findOne({ id: reservation });

    if (type) {
      data.status = ReservationStatuses.InProgress;
    } else {
      data.status = ReservationStatuses.Completed;
    }
    data.updatedAt = new Date().toISOString();

    return this.reservationRepository.save(data);
  }

  public async updateReservationReviewed(
    updateReservationDto: UpdateReservationDto,
  ): Promise<Reservation> {
    try {
      const { data, where } = updateReservationDto;

      const reservation = await this.getReservationById(where);

      const fieldsToUpdate = Object.keys(data);

      for (const field of fieldsToUpdate) {
        reservation[field] = data[field];
      }

      reservation.updatedAt = new Date().toISOString();

      return this.reservationRepository.save(reservation);
    } catch {
      throw new RpcException('Invalid operation');
    }
  }

  public async cancelReservation(
    cancelReservationDto: CancelReservationDto,
  ): Promise<Reservation> {
    try {
      const { cancelReservationInput, user } = cancelReservationDto;

      const reservation = await this.reservationRepository.findOne({
        id: cancelReservationInput.id,
      });

      if (reservation.client != user.id && reservation.owner != user.id) {
        throw new RpcException('Entry not found');
      }

      const { id, checkInDate, parking } = reservation;

      const extractDateTime = this.extractDateTime(checkInDate);
      const { day, month, year } = extractDateTime.date;

      const reservationDate = new Date(year, month - 1, day).toISOString();

      if (
        reservation.status != ReservationStatuses.Completed &&
        reservation.status != ReservationStatuses.InProgress
      ) {
        reservation.status = ReservationStatuses.Cancelled;
      } else {
        throw new RpcException(`This reservation is ${reservation.status}`);
      }

      try {
        const parkingCalendar = await this.calendarRepository.findOne({
          parking,
          date: reservationDate,
        });

        const _schedules = parkingCalendar.schedules.filter(
          el => el.reservation != id,
        );

        parkingCalendar.schedules = _schedules;

        await this.calendarRepository.save(parkingCalendar);
      } catch {}

      await this.taskService.deleteCron(reservation.id);

      await this.taskService.deleteCron(reservation.id + ':deleted');

      return this.reservationRepository.save(reservation);
    } catch {
      throw new RpcException('Invalid operation');
    }
  }
}
