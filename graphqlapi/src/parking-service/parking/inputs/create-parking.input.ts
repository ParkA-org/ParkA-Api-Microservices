import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';
import { ICreateParkingInput } from '../interfaces/create-parking-input.interface';

@InputType()
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

  @Field()
  calendar: string[];

  @Field()
  priceHours: string;

  @Field()
  pictures: string[];

  @Field()
  mainPicture: string;

  @Field()
  sector: string;

  @Field()
  direction: string;

  @Field()
  information: string;

  @Field()
  features: string[];
}
