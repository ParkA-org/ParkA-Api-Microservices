import { IUpdateReservationFromCronJobDto } from '../interfaces/update-reservation-from-cron-job-dto.interface';

export class UpdateReservationFromCronJobDto
  implements IUpdateReservationFromCronJobDto {
  reservation: string;
  type: boolean;
}
