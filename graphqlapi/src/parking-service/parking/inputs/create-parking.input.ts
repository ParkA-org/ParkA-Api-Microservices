import { Field, ID, InputType } from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';
import { CreateCalendarInputType } from 'src/parking-service/calendar/inputs/create-calendar.input';

@InputType('CreateParkingInput')
export class CreateParkingInput {
  @Field()
  countParking: number;

  @Field()
  latitude: string;

  @Field()
  longitude: string;

  @Field()
  @MinLength(2)
  @MaxLength(50)
  parkingName: string;

  @Field()
  calendar: CreateCalendarInputType;

  @Field()
  priceHours: string;

  @Field(type => [ID])
  pictures: string[];

  @Field()
  mainPicture: string;

  @Field()
  sector: string;

  @Field()
  direction: string;

  @Field()
  information: string;

  @Field(type => [ID])
  features: string[];
}
