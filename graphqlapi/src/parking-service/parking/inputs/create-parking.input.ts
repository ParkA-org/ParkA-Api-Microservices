import { Field, ID, InputType, Int } from '@nestjs/graphql';
import {
  IsLatitude,
  IsLongitude,
  IsPositive,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateCalendarInputType } from 'src/parking-service/calendar/inputs/create-calendar.input';
import { ICreateParkingInput } from '../interfaces/create-parking-input.interface';

@InputType('CreateParkingInput')
export class CreateParkingInput implements ICreateParkingInput {
  @Field(type => Int)
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
  @IsUrl()
  mainPicture: string;

  @Field({ nullable: true })
  sector: string;

  @Field()
  direction: string;

  @Field({ nullable: true })
  information: string;

  @Field(type => [ID])
  features: string[];
}
