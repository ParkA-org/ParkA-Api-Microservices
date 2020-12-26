import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ILoginType } from '../interfaces/login-type.interface';
import { UserType } from './user.type';

@ObjectType('Login')
export class LoginType implements ILoginType {
  @Field({ nullable: true })
  JWT: string;

  @Field(type => UserType, { nullable: true })
  user: UserType;

  @Field({ nullable: true })
  register: boolean;
}
