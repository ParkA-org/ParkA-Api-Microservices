import { Field, InputType } from '@nestjs/graphql';
import { CreateScheduleInputType } from './create-schedule.input';

@InputType('CreateCalendarInput')
export class CreateCalendarInputType implements ICreateCalendarInput {
  @Field(type => [CreateScheduleInputType], {
    defaultValue: [],
    nullable: true,
  })
  monday: CreateScheduleInputType[];

  @Field(type => [CreateScheduleInputType], {
    defaultValue: [],
    nullable: true,
  })
  tuesday: CreateScheduleInputType[];

  @Field(type => [CreateScheduleInputType], {
    defaultValue: [],
    nullable: true,
  })
  wednesday: CreateScheduleInputType[];

  @Field(type => [CreateScheduleInputType], {
    defaultValue: [],
    nullable: true,
  })
  thursday: CreateScheduleInputType[];

  @Field(type => [CreateScheduleInputType], {
    defaultValue: [],
    nullable: true,
  })
  friday: CreateScheduleInputType[];

  @Field(type => [CreateScheduleInputType], {
    defaultValue: [],
    nullable: true,
  })
  saturday: CreateScheduleInputType[];

  @Field(type => [CreateScheduleInputType], {
    defaultValue: [],
    nullable: true,
  })
  sunday: CreateScheduleInputType[];
}
