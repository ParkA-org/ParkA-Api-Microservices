import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { IResetPasswordInput } from '../interfaces/reset-password-input.interface';

@InputType()
export class ResetPasswordInput implements IResetPasswordInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  origin: string;
}
