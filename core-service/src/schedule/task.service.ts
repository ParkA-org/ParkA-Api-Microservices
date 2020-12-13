import { Injectable, Logger } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  MessagePattern,
  Transport,
} from '@nestjs/microservices';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { TaskDto } from './dtos/task.dto';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  private client: ClientProxy;

  constructor(
    private schedulerRegistry: SchedulerRegistry,
    client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: { url: `${process.env.REDIS_URL}` },
    }),
  ) {}

  @MessagePattern({ type: 'add-cron-job-parking' })
  addCronJobParking(taskDto: TaskDto) {
    const job = new CronJob(`* ${taskDto.startTime} * * * *`, () => {
      this.logger.warn(
        `time (${taskDto.startTime}) for job ${taskDto.parking} to run!`,
      );

      const obj = {
        parking: taskDto.parking,
        isAvailable: false,
      };

      this.client.send<TaskDto>({ type: 'update-parking-from-cron-job' }, obj);
    });

    const job2 = new CronJob(`* ${taskDto.endTime} * * * *`, () => {
      this.logger.warn(
        `time (${taskDto.startTime}) for job ${taskDto.parking} to run!`,
      );

      const obj = {
        parking: taskDto.parking,
        isAvailable: true,
      };

      this.client.send<TaskDto>({ type: 'update-parking-from-cron-job' }, obj);
    });

    this.schedulerRegistry.addCronJob(taskDto.parking, job);
    this.schedulerRegistry.addCronJob(taskDto.parking + 2, job2);
    job.start();
    job2.start();

    this.logger.warn(
      `job ${taskDto.parking} added for each ${taskDto.startTime} minutes!`,
    );
  }

  @MessagePattern({ type: 'delete-cron-job-parking' })
  deleteCron(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
    this.logger.warn(`job ${name} deleted!`);
  }
}
