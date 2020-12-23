import { Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

export class SocialLoginInput implements ISocialLoginInput {
  @Field()
  displayName: string;

  @Field()
  photoUrl: string;

  @Field()
  email: string;

  @Field()
  origin: string;
}
