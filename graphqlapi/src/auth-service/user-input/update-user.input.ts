import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  @MinLength(2)
  @MaxLength(50)
  name?: string;

  @Field({ nullable: true })
  @MinLength(2)
  @MaxLength(50)
  lastName?: string;

  @Field({ nullable: true })
  profilePicture?: string;

  @Field({ nullable: true })
  password?: string;
}
