import { Field, ObjectType } from '@nestjs/graphql';
import { IsUUID, MaxLength, MinLength } from 'class-validator';
import { UserInformationType } from 'src/core-service/user-information/types/user-information.type';
import { IParkingType } from '../interfaces/parking-type.interface';

@ObjectType('Parking')
export class ParkingType implements IParkingType {
  @Field()
  @IsUUID('4')
  id: string;

  @Field()
  countParking: number;

  @Field()
  latitude: string;

  @Field()
  longitude: string;

  @Field()
  published: boolean;

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
  isAvailable: boolean;

  @Field()
  sector: string;

  @Field()
  direction: string;

  @Field()
  information: string;

  @Field(type => [FeatureType])
  features: string[];

  @Field()
  verified: boolean;

  @Field(type => UserInformationType)
  @IsUUID('4')
  userInformation: string;
}