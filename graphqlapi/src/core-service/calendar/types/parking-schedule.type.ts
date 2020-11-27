import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ParkingSchedule {
  @Field()
  start: number;

  @Field()
  finish: number;
}
