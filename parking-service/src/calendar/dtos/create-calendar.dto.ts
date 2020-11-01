import { Schedule } from '../entities/schedule.entity';

export class CreateCalendarDto implements ICreateCalendarDto {
  parkingId: string;
  monday: Schedule[];
  tuesday: Schedule[];
  wednesday: Schedule[];
  thursday: Schedule[];
  friday: Schedule[];
  saturday: Schedule[];
  sunday: Schedule[];
}
