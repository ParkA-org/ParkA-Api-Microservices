import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private schedulerRegistry: SchedulerRegistry) {}

  addCronJobParking(name: string, minutes: string) {
    const job = new CronJob(`* ${minutes} * * * *`, () => {
      this.logger.warn(`time (${minutes}) for job ${name} to run!`);
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    this.logger.warn(`job ${name} added for each ${minutes} minutes!`);
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
