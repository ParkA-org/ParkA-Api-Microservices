import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType('SocialLoginInput')
export class SocialLoginInput implements ISocialLoginInput {
  @Field()
  displayName: string;

  @Field({ nullable: true })
  photoUrl: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  origin: string;
}
