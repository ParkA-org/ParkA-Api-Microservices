import { Field, InputType } from '@nestjs/graphql';

import { CreateScheduleInputType } from './create-schedule.input';

@InputType('UpdateCalendarPayload')
export class UpdateCalendarPayload implements IUpdateCalendarPayload {
  @Field(type => [CreateScheduleInputType], {
    nullable: true,
  })
  monday: CreateScheduleInputType[];

  @Field(type => [CreateScheduleInputType], {
    nullable: true,
  })
  tuesday: CreateScheduleInputType[];

  @Field(type => [CreateScheduleInputType], {
    nullable: true,
  })
  wednesday: CreateScheduleInputType[];

  @Field(type => [CreateScheduleInputType], {
    nullable: true,
  })
  thursday: CreateScheduleInputType[];

  @Field(type => [CreateScheduleInputType], {
    nullable: true,
  })
  friday: CreateScheduleInputType[];

  @Field(type => [CreateScheduleInputType], {
    nullable: true,
  })
  saturday: CreateScheduleInputType[];

  @Field(type => [CreateScheduleInputType], {
    nullable: true,
  })
  sunday: CreateScheduleInputType[];
}
