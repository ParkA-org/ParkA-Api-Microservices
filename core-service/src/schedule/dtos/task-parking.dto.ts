import { ITaskParkingDto } from '../interfaces/task-parking-dto.interface';

export class TaskParkingDto implements ITaskParkingDto {
  parking: string;
  startTime: string;
  endTime: string;
}
