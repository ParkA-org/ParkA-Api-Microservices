import { Field, InputType } from '@nestjs/graphql';
import { IValidateEmailCode } from '../interfaces/valid-email-code-input.interface';

@InputType()
export class ValidateEmailCode implements IValidateEmailCode {
  @Field({ nullable: true })
  email: string;

  @Field()
  origin: string;

  @Field()
  code: string;
}
