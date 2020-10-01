import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import { IValidateResetPasswordCodeInput } from '../interfaces/validate-reset-password-code-input.interface';

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
