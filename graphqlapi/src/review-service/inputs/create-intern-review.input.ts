import { IsUUID } from 'class-validator';

export class CreateInternReviewInput implements ICreateInternReviewInput {
  parking: string;

  @IsUUID('all')
  user: string;

  reservation: string;

  title: string;

  review: string;

  calification: number;

  type: boolean;
}
