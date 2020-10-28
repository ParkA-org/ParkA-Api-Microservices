import { Schedule } from '../entities/schedule.entity';

export class UpdateCalendarPayload implements IUpdateCalendarPayload {
  monday: Schedule[];
  tuesday: Schedule[];
  wednesday: Schedule[];
  thursday: Schedule[];
  friday: Schedule[];
  saturday: Schedule[];
  sunday: Schedule[];
}
