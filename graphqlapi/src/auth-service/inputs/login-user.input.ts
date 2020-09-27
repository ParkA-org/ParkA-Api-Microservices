import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';
import { ILoginUserInput } from '../interfaces/login-user-input.interface';

@InputType()
export class LoginUserInput implements ILoginUserInput {
  @Field()
  @IsEmail()
  email: string;

  @MinLength(8)
  @Field()
  password: string;
}
