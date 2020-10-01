import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class ValidateResetPasswordCodeInput
  implements IValidateResetPasswordCodeInput {
  @Field({ nullable: true })
  email: string;

  @Field()
  origin: string;

  @Field()
  code: string;

  @MinLength(8)
  @Field()
  newPassword: string;
}
