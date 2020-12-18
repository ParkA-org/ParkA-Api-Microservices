import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserInformationType } from 'src/core-service/user-information/types/user-information.type';
import { ReviewType } from 'src/review-service/types/review.type';
import { IUserType } from '../interfaces/user-type.interface';

@ObjectType('User')
export class UserType implements IUserType {
  @Field(type => ID, { nullable: true })
  id: string;

  @Field(type => ID, { nullable: true })
  _id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  profilePicture?: string;

  @Field({ nullable: true })
  confirmed: boolean;

  @Field(type => UserInformationType, { nullable: true })
  userInformation: string;

  @Field()
  origin: string;

  @Field(type => [ReviewType])
  reviews: ReviewType[];
}
