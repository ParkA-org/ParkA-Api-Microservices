import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserType } from './user.type';

@ObjectType('Login')
export class LoginType {
  @Field(type => ID)
  JWT: string;

  user: UserType;
}
