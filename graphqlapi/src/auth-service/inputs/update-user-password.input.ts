import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsLowercase, MinLength } from 'class-validator';
import { IUpdateUserPasswordInput } from '../interfaces/update-user-password-input.interface';

@InputType()
export class UpdateUserPasswordInput implements IUpdateUserPasswordInput {
  @MinLength(8)
  @Field()
  newPassword: string;

  @MinLength(8)
  @Field()
  oldPassword: string;
}
