import { GetCalendarByIdDto } from './get-calendar-by-id.dto';
import { UpdateCalendarPayload } from './update-calendar.payload';

export class UpdateCalendarDto implements IUpdateCalendarDto {
  calendarId: GetCalendarByIdDto;
  updateCalendarPayload: UpdateCalendarPayload;
}
