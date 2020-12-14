import { Injectable, Logger } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { ReservationService } from 'src/reservation/reservation.service';
import { TaskDto } from './dtos/task.dto';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  private client: ClientProxy;

  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private reservationService: ReservationService,
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: { url: `${process.env.REDIS_URL}` },
    });
  }

  async addCronJobParking(taskDto: TaskDto) {
    const hoursStart = taskDto.startTime.split('T')[1].split(':')[0];
    const dayStart = taskDto.startTime.split('T')[0].split('-')[2];
    const minuteStart = taskDto.startTime.split('T')[1].split(':')[1];

    const hoursEnd = taskDto.endTime.split('T')[1].split(':')[0];
    const dayEnd = taskDto.endTime.split('T')[0].split('-')[2];
    const minuteEnd = taskDto.endTime.split('T')[1].split(':')[1];

    const job = new CronJob(
      `${minuteStart} ${hoursStart} ${dayStart} * *`,
      async () => {
        this.logger.warn(
          `time (${taskDto.startTime}) for job ${taskDto.parking} to run!`,
        );

        const obj = {
          parking: taskDto.parking,
          isAvailable: false,
        };

        const obj2 = {
          reservation: taskDto.reservation,
          type: true,
        };

        console.log('tu deberias ser el primero');
        await this.client.send<TaskDto>(
          { type: 'update-parking-from-cron-job' },
          obj,
        );
        console.log('llegue aca');
        this.reservationService.updateReservationFromCronJob(obj2);
      },
      'America/Santo_Domingo',
    );

    const job2 = new CronJob(
      `${minuteEnd} ${hoursEnd} ${dayEnd} * *`,
      async () => {
        this.logger.warn(
          `time (${taskDto.endTime}) for job ${taskDto.parking} to run!`,
        );

        const obj = {
          parking: taskDto.parking,
          isAvailable: true,
        };

        const obj2 = {
          reservation: taskDto.reservation,
          type: false,
        };

        console.log('cuando tu te ejecutas');
        await this.client.send<TaskDto>(
          { type: 'update-parking-from-cron-job' },
          obj,
        );
        await this.client.send<Reservation>(
          { type: 'update-reservation-from-cron-job' },
          obj2,
        );
      },
      'America/Santo_Domingo',
    );

    this.schedulerRegistry.addCronJob(taskDto.reservation, job);
    this.schedulerRegistry.addCronJob(taskDto.reservation + 2, job2);
    await job.start();
    await job2.start();

    this.logger.warn(
      `job ${taskDto.parking} added for each ${taskDto.startTime} minutes!`,
    );
  }

  deleteCron(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
    this.logger.warn(`job ${name} deleted!`);
  }
}
