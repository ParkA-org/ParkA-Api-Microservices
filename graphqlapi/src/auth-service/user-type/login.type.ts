import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserType } from './user.type';

@ObjectType('Login')
export class LoginType {
  @Field({ nullable: true })
  JWT: string;

  @Field(type => UserType, { nullable: true })
  user: UserType;
}
