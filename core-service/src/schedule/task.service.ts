import { Injectable, Logger } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { TaskDto } from './dtos/task.dto';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  private client: ClientProxy;

  constructor(private schedulerRegistry: SchedulerRegistry) {
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

    if (taskDto.type) {
      const job = new CronJob(
        `${minuteStart} ${hoursStart} ${dayStart} * *`,
        async () => {
          this.logger.warn(
            `time (${taskDto.startTime}) for job ${taskDto.name} to run!`,
          );

          const obj = {
            parking: taskDto.parking,
            isAvailable: false,
          };

          const obj2 = {
            reservation: taskDto.reservation,
            type: true,
          };

          await this.updateParking(obj);
          await this.updateReservation(obj2);
          await this.deleteCron(taskDto.name.split(':')[0]);
        },
        'America/Santo_Domingo',
        true,
      );

      this.schedulerRegistry.addTimeout(taskDto.name, job);
      job.start();
      this.logger.warn(
        `job ${taskDto.name} added for each ${taskDto.startTime} date!`,
      );
    } else {
      const job2 = new CronJob(
        `${minuteEnd} ${hoursEnd} ${dayEnd} * *`,
        async () => {
          this.logger.warn(
            `time (${taskDto.endTime}) for job ${taskDto.name} to run!`,
          );

          const obj = {
            parking: taskDto.parking,
            isAvailable: true,
          };

          const obj2 = {
            reservation: taskDto.reservation,
            type: false,
          };

          await this.updateParking(obj);
          await this.updateReservation(obj2);
          await this.deleteCron(taskDto.name);
        },
        'America/Santo_Domingo',
        true,
      );
      this.schedulerRegistry.addTimeout(taskDto.name, job2);
      job2.start();
      this.logger.warn(
        `job ${taskDto.name} added for each ${taskDto.endTime} date!`,
      );
    }
  }

  public async updateParking(obj: Object): Promise<Object> {
    const response = await this.client.send<TaskDto>(
      { type: 'update-parking-from-cron-job' },
      obj,
    );
    return response.toPromise();
  }

  public async updateReservation(obj: Object): Promise<Object> {
    const response = await this.client.send<TaskDto>(
      { type: 'update-reservation-from-cron-job' },
      obj,
    );
    return response.toPromise();
  }

  deleteCron(name: string) {
    try {
      this.schedulerRegistry.deleteTimeout(name);
      this.logger.warn(`job ${name} deleted!`);
    } catch {}
  }
}
