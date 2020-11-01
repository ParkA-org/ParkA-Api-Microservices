import { Field, InputType } from '@nestjs/graphql';
import { CreateScheduleInputType } from './create-schedule.input';

@InputType('UpdateCalendarPayload')
export class UpdateCalendarPayload implements IUpdateCalendarPayload {
  @Field(type => [CreateScheduleInputType])
  monday: CreateScheduleInputType[];

  @Field(type => [CreateScheduleInputType])
  tuesday: CreateScheduleInputType[];

  @Field(type => [CreateScheduleInputType])
  wednesday: CreateScheduleInputType[];

  @Field(type => [CreateScheduleInputType])
  thursday: CreateScheduleInputType[];

  @Field(type => [CreateScheduleInputType])
  friday: CreateScheduleInputType[];

  @Field(type => [CreateScheduleInputType])
  saturday: CreateScheduleInputType[];

  @Field(type => [CreateScheduleInputType])
  sunday: CreateScheduleInputType[];
}
