import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsLatitude,
  IsLongitude,
  IsPositive,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateCalendarInputType } from 'src/parking-service/calendar/inputs/create-calendar.input';
import { ICreateParkingInput } from '../interfaces/create-parking-input.interface';

@InputType('CreateParkingInput')
export class CreateParkingInput implements ICreateParkingInput {
  @Field()
  @IsPositive()
  countParking: number;

  @Field()
  @IsLatitude()
  latitude: string;

  @Field()
  @IsLongitude()
  longitude: string;

  @Field()
  @MinLength(2)
  @MaxLength(50)
  parkingName: string;

  @Field()
  calendar: CreateCalendarInputType;

  @Field()
  @IsPositive()
  priceHours: number;

  @Field(type => [ID], { nullable: true, defaultValue: [] })
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
