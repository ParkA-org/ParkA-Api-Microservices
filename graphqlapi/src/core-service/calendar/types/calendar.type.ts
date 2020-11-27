import { Field, ObjectType } from '@nestjs/graphql';
import { ParkingSchedule } from './parking-schedule.type';

@ObjectType()
export class ParkingCalendarType {
  @Field()
  id: string;

  @Field()
  parking: string;

  @Field(type => [ParkingSchedule])
  schedules: ParkingSchedule[];

  @Field()
  date: string;
}
