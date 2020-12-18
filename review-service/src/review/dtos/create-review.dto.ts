import { ICreateReviewDto } from '../interfaces/create-review-dto.interface';
import { IsUUID } from 'class-validator';

export class CreateReviewDto implements ICreateReviewDto {
  @IsUUID('all')
  user: string;

  @IsUUID('all')
  reviewedUser: string;

  @IsUUID('all')
  parking: string;

  @IsUUID('all')
  reservation: string;

  title: string;

  review: string;

  calification: number;

  type: boolean;
}
