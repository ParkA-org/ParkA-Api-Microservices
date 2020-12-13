import { ITaskReservationDto } from '../interfaces/task-reservation-dto.interface';

export class TaskReservationDto implements ITaskReservationDto {
  reservation: string;
  startTime: string;
  endTime: string;
}
