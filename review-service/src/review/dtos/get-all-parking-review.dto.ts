import { IGetAllParkingReviewDto } from '../interfaces/get-all-parking-review.interface';
import { IsUUID } from 'class-validator';

export class GetAllParkingReview implements IGetAllParkingReviewDto {
  @IsUUID('all')
  parking: string;
}
