import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsUUID } from 'class-validator';

@InputType()
export class GetParkingCalendarInput {
  @Field()
  @IsUUID()
  parking: string;

  @Field()
  @IsDateString()
  date: string;
}
