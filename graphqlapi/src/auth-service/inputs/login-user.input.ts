import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';
import { ILoginUserInput } from '../interfaces/login-user-input.interface';

@InputType('LoginUserInput')
export class LoginUserInput implements ILoginUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  password: string;
}
