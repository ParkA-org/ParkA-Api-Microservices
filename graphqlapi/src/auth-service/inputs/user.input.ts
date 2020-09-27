import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { IUserInput } from '../interfaces/user-input.interface';
@InputType()
export class CreateUserInput implements IUserInput {
  @Field()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @Field()
  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  profilePicture?: string;

  @MinLength(8)
  @Field()
  password: string;
}
