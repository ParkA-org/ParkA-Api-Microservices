import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { ICreateReviewInput } from '../interfaces/create-review-input.interface';

@InputType('CreateReviewInput')
export class CreateReviewInput implements ICreateReviewInput {
  @Field()
  @IsUUID('all')
  parking: string;

  @Field()
  @IsUUID('all')
  reservation: string;

  @Field({ nullable: true })
  title: string;

  @Field()
  @MinLength(2)
  @MaxLength(256)
  review: string;

  @Field()
  calification: number;

  @Field()
  type: boolean;

  @Field()
  @IsUUID('all')
  reviewedUser: string;
}
