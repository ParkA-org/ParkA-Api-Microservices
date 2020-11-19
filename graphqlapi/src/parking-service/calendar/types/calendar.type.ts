import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ScheduleType } from './schedule.type';

@ObjectType('Calendar')
export class CalendarType implements ICalendarType {
  @Field(type => ID)
  id: string;

  @Field()
  parkingId: string;

  @Field(type => [ScheduleType])
  monday: ScheduleType[];

  @Field(type => [ScheduleType])
  tuesday: ScheduleType[];

  @Field(type => [ScheduleType])
  wednesday: ScheduleType[];

  @Field(type => [ScheduleType])
  thursday: ScheduleType[];

  @Field(type => [ScheduleType])
  friday: ScheduleType[];

  @Field(type => [ScheduleType])
  saturday: ScheduleType[];

  @Field(type => [ScheduleType])
  sunday: ScheduleType[];
}
