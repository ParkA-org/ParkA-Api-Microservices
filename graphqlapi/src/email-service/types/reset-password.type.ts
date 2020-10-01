import { Field, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { IResetPasswordType } from '../interfaces/reset-password-type.interface';

@ObjectType()
export class ResetPasswordType implements IResetPasswordType {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  origin: string;
}
