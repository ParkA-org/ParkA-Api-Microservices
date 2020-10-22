import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, ValidateIf } from 'class-validator';
import { IValidateEmailCodeInput } from '../interfaces/valid-email-code-input.interface';

@InputType('ValidateEmailCodeInput')
export class ValidateEmailCodeInput implements IValidateEmailCodeInput {
  @Field({ nullable: true })
  @ValidateIf((input: ValidateEmailCodeInput) => input.email !== undefined)
  @IsEmail()
  email: string;

  @Field()
  origin: string;

  @Field()
  code: string;
}
