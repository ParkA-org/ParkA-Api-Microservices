import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Schedule')
export class ScheduleType implements IScheduleType {
  @Field()
  start: number;
  @Field()
  finish: number;
}
