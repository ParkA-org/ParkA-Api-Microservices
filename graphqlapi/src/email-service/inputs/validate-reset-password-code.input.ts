import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MinLength, ValidateIf } from 'class-validator';
import { IValidateResetPasswordCodeInput } from '../interfaces/validate-reset-password-code-input.interface';

@InputType()
export class ValidateResetPasswordCodeInput
  implements IValidateResetPasswordCodeInput {
  @Field({ nullable: true })
  @ValidateIf(
    (input: ValidateResetPasswordCodeInput) => input.email !== undefined,
  )
  @IsEmail()
  email: string;

  @Field()
  origin: string;

  @Field()
  code: string;

  @Field()
  @MinLength(8)
  newPassword: string;
}
