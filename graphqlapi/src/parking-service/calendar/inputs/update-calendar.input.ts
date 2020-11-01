import { Field, InputType } from '@nestjs/graphql';
import { GetCalendarByIdInput } from './get-calendar-by-id.input';
import { UpdateCalendarPayload } from './update-calendar.payload';

@InputType('UpdateCalendarInput')
export class UpdateCalendarInput implements IUpdateCalendarInput {
  @Field()
  calendarId: GetCalendarByIdInput;

  @Field()
  updateCalendarPayload: UpdateCalendarPayload;
}
