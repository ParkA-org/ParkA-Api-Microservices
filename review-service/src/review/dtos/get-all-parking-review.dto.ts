import { IGetAllParkingReviewDto } from '../interfaces/get-all-parking-review.interface';
import { IsUUID } from 'class-validator';

export class GetAllParkingReviewDto implements IGetAllParkingReviewDto {
  @IsUUID('all')
  parking: string;
}
