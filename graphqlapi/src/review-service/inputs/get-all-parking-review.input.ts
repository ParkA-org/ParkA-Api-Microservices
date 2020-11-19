import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { IGetAllParkingReviewInput } from '../interfaces/get-all-parking-review-input';

@InputType('GetAllParkingReviewInput')
export class GetAllParkingReviewInput implements IGetAllParkingReviewInput {
  @Field()
  @IsUUID('all')
  parking: string;
}
