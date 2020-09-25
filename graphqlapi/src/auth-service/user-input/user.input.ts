import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

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

  @Field({ nullable: true })
  profilePicture?: string;

  @MinLength(8)
  @Field()
  password: string;
}

// @Matches(/((?=.*\d) | (?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
//   message: 'Password too weak',
// })

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
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  profilePicture?: string;

  @Field({ nullable: true })
  password?: string;
}

@InputType()
export class LoginUserInput {
  @Field()
  @IsEmail()
  email: string;

  @MinLength(8)
  @Field()
  password: string;
}
