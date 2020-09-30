import { Field, InputType } from '@nestjs/graphql';
import { IValidateEmailCodeInput } from '../interfaces/valid-email-code-input.interface';

@InputType()
export class ValidateEmailCodeInput implements IValidateEmailCodeInput {
  @Field({ nullable: true })
  email: string;

  @Field()
  origin: string;

  @Field()
  code: string;
}
