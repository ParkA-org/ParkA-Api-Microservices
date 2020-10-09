import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsUUID, MaxLength, MinLength } from 'class-validator';
import { UserInformationType } from 'src/core-service/user-information/types/user-information.type';
import { FeatureType } from 'src/parking-service/feature/types/feature.type';
import { IParkingType } from '../interfaces/parking-type.interface';

@ObjectType()
export class ParkingType implements IParkingType {
  @Field(type => ID)
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

  @Field(type => [String])
  calendar: string[];

  @Field()
  priceHours: string;

  @Field(type => [String])
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
