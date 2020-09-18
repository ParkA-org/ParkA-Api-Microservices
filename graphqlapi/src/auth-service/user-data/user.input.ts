import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { isNullableType } from 'graphql';

@InputType()
export class CreateUserInput {
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

  @Field()
  profilePicture: string;
}

@InputType()
export class UpdateUserInput {
  @Field()
  id: string;

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

  @Field()
  profilePicture: string;
}
