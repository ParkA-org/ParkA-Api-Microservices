import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsUrl,
  IsUUID,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { IUserInput } from '../interfaces/user-input.interface';

@InputType('CreateUserInput')
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
  origin: string;

  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @ValidateIf((input: CreateUserInput) => input.profilePicture !== undefined)
  @IsUrl()
  profilePicture: string;

  @Field()
  @IsUUID('4')
  userInformation: string;

  @Field()
  @MinLength(8)
  password: string;
}
