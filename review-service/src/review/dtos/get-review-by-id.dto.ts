import { IGetReviewByIdDto } from '../interfaces/get-review-by-id-dto.interface';
import { IsUUID } from 'class-validator';

export class GetReviewByIdDto implements IGetReviewByIdDto {
  @IsUUID('all')
  id: string;
}
