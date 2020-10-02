import { Field, ID, ObjectType } from '@nestjs/graphql';
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

  @Field()
  origin: string;
}
