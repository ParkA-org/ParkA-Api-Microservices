import { ITaskDto } from '../interfaces/task-dto.interface';

export class TaskDto implements ITaskDto {
  reservation: string;
  parking: string;
  startTime: string;
  endTime: string;
}
