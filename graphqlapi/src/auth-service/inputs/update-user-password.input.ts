import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';
import { IUpdateUserPasswordInput } from '../interfaces/update-user-password-input.interface';

@InputType()
export class UpdateUserPasswordInput implements IUpdateUserPasswordInput {
  @Field()
  @IsEmail()
  email: string;

  @MinLength(8)
  @Field()
  newPassword: string;

  @MinLength(8)
  @Field()
  oldPassword: string;
}
