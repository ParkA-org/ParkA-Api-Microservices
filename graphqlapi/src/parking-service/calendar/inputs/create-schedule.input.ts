import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsPositive } from 'class-validator';

@InputType('CreateScheduleInput')
export class CreateScheduleInputType implements IScheduleType {
  @Field()
  @IsNumber()
  @IsPositive()
  start: number;

  @Field()
  @IsNumber()
  @IsPositive()
  finish: number;
}
