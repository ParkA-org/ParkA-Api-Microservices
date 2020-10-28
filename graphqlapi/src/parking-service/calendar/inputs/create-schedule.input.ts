import { Field, InputType } from '@nestjs/graphql';

@InputType('CreateScheduleInput')
export class CreateScheduleInputType implements IScheduleType {
  @Field()
  start: string;
  @Field()
  finish: string;
}
