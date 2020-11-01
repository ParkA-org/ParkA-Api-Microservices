import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth-service/strategy/auth.guard';
import { CalendarService } from './calendar.service';
import { UpdateCalendarInput } from './inputs/update-calendar.input';
import { CalendarType } from './types/calendar.type';

@Resolver(of => CalendarType)
export class CalendarResolver {
  constructor(private readonly calendarService: CalendarService) {}

  @UseGuards(AuthGuard)
  @Mutation(of => CalendarType)
  public async updateCalendar(
    @Args('updateCalendarInput') updateCalendarInput: UpdateCalendarInput,
  ): Promise<CalendarType> {
    return this.calendarService.updateCalendar(updateCalendarInput);
  }
}
