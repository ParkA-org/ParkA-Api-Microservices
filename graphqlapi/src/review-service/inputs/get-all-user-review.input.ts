import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { IGetAllUserReviewInput } from '../interfaces/get-all-user-review-input.interface';

@InputType('GetAllUserReviewInput')
export class GetAllUserReviewInput implements IGetAllUserReviewInput {
  @Field()
  @IsUUID('all')
  user: string;
}
