import { Field, ID, InputType } from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';
import { ICreateParkingInput } from '../interfaces/create-parking-input.interface';

@InputType('createParkingInput')
export class CreateParkingInput implements ICreateParkingInput {
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

  @Field(type => [ID])
  calendar: string[];

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
