import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserType } from 'src/auth-service/types/user.type';
import { ReservationType } from 'src/core-service/reservation/types/reservation.type';
import { ParkingType } from 'src/parking-service/parking/types/parking.type';
import { IReviewType } from '../interfaces/review-type.interface';

@ObjectType('Review')
export class ReviewType implements IReviewType {
  @Field(type => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  calification: number;

  @Field(type => ParkingType)
  parking: string;

  @Field(type => UserType)
  user: string;

  @Field(type => ReservationType)
  reservation: string;

  @Field()
  review: string;

  @Field()
  type: boolean;

  @Field()
  createdAt: string;
}
