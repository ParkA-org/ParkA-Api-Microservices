import { IUpdateParkingFromCronJobDto } from '../interfaces/update-parking-from-cron-job-dto.interface';

export class UpdateParkingFromCronJobDto
  implements IUpdateParkingFromCronJobDto {
  parking: string;
  isAvailable: boolean;
}
