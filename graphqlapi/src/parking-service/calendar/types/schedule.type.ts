import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Schedule')
export class ScheduleType implements IScheduleType {
  @Field()
  start: string;
  @Field()
  finish: string;
}
