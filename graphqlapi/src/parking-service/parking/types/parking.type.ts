import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { UserType } from 'src/auth-service/types/user.type';
import { UserInformationType } from 'src/core-service/user-information/types/user-information.type';
import { CalendarType } from 'src/parking-service/calendar/types/calendar.type';
import { FeatureType } from 'src/parking-service/feature/types/feature.type';
import { IParkingType } from '../interfaces/parking-type.interface';

@ObjectType('Parking')
export class ParkingType implements IParkingType {
  @Field(type => ID)
  id: string;

  @Field(type => Int)
  countParking: number;

  @Field()
  latitude: number;

  @Field()
  longitude: number;

  @Field()
  published: boolean;

  @Field()
  parkingName: string;

  //TODO: update here with corresponding type
  @Field(type => CalendarType)
  calendar: string;

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

  @Field({ nullable: true })
  information: string;

  @Field(type => [FeatureType])
  features: string[];

  @Field()
  verified: boolean;

  @Field(type => UserInformationType, { nullable: true })
  userInformation: string;

  @Field(type => UserType, { nullable: true })
  user: string;

  @Field()
  rating: number;
}
