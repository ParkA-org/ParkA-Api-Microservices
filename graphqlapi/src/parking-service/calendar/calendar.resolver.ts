import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CalendarService } from './calendar.service';
import { UpdateCalendarInput } from './inputs/update-calendar.input';
import { CalendarType } from './types/calendar.type';

@Resolver(of => CalendarType)
export class CalendarResolver {
  constructor(private readonly calendarService: CalendarService) {}

  @Mutation(of => CalendarType)
  public async updateCalendar(
    @Args('updateCalendarInput') updateCalendarInput: UpdateCalendarInput,
  ): Promise<CalendarType> {
    return this.calendarService.updateCalendar(updateCalendarInput);
  }
}
