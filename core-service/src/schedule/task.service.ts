import { Injectable, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { TaskParkingDto } from './dtos/task-parking.dto';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private schedulerRegistry: SchedulerRegistry) {}

  @MessagePattern({ type: 'add-cron-job-parking' })
  addCronJobParking(taskParkingdto: TaskParkingDto) {
    const job = new CronJob(`* ${taskParkingdto.startTime} * * * *`, () => {
      this.logger.warn(
        `time (${taskParkingdto.startTime}) for job ${taskParkingdto.parking} to run!`,
      );
    });

    this.schedulerRegistry.addCronJob(taskParkingdto.parking, job);
    job.start();

    this.logger.warn(
      `job ${taskParkingdto.parking} added for each ${taskParkingdto.startTime} minutes!`,
    );
  }

  addCronJobReservation(name: string, minutes: string) {
    const job = new CronJob(`* ${minutes} * * * *`, () => {
      this.logger.warn(`time (${minutes}) for job ${name} to run!`);
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    this.logger.warn(`job ${name} added for each ${minutes} minutes!`);
  }

  deleteCron(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
    this.logger.warn(`job ${name} deleted!`);
  }
}
