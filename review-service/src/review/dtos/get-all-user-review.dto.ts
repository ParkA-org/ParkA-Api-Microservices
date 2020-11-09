import { IGetAllUserReviewDto } from '../interfaces/get-all-user-review-dto.interface';
import { IsUUID } from 'class-validator';

export class GetAllUserReviewDto implements IGetAllUserReviewDto {
  @IsUUID('all')
  user: string;
}
