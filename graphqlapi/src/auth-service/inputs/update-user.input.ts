import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUrl, MaxLength, MinLength, ValidateIf } from 'class-validator';
import { IUpdateUserInput } from '../interfaces/update-user-input.interface';

@InputType('UpdateUserInput')
export class UpdateUserInput implements IUpdateUserInput {
  @Field({ nullable: true })
  @ValidateIf((input: UpdateUserInput) => input.name !== undefined)
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @Field({ nullable: true })
  @ValidateIf((input: UpdateUserInput) => input.lastName !== undefined)
  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @Field({ nullable: true })
  @ValidateIf((input: UpdateUserInput) => input.profilePicture !== undefined)
  @IsUrl()
  profilePicture: string;

  @Field()
  origin: string;
}
