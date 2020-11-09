import { isNullOrUndefined } from 'util';
import { IUpdateReviewDto } from '../interfaces/update-review-dto.interface';
import { IsUUID } from 'class-validator';

export class UpdateReviewDto implements IUpdateReviewDto {
  @IsUUID('all')
  id: string;
  review: string;
  calification: number;
  title: string;
}
