import { Field, InputType } from '@nestjs/graphql';
import { IsUUID, MaxLength, MinLength } from 'class-validator';
import { IUpdateReviewInput } from '../interfaces/update-review-input.interface';

@InputType('UpdateReviewInput')
export class UpdateReviewInput implements IUpdateReviewInput {
  @Field()
  @IsUUID('all')
  id: string;

  @Field({ nullable: true })
  title: string;

  @Field()
  @MinLength(2)
  @MaxLength(256)
  review: string;

  @Field()
  calification: number;
}
