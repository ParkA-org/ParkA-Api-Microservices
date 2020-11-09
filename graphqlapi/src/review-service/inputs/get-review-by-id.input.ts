import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { IGetReviewByIdInput } from '../interfaces/get-review-by-id-input.interface';

@InputType('GetReviewByIdInput')
export class GetReviewByIdInput implements IGetReviewByIdInput {
  @Field()
  @IsUUID('all')
  id: string;
}
