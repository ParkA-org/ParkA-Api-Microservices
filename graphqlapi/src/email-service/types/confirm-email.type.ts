import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ILoginType } from '../interfaces/login-type.interface';
import { UserType } from './user.type';

@ObjectType('ConfirmEmail')
export class ConfirmEmailType implements ILoginType {
  @Field({ nullable: true })
  JWT: string;

  @Field(type => UserType, { nullable: true })
  user: UserType;
}
