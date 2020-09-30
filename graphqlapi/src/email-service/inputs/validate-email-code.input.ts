import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ValidateEmailCode implements IValidateEmailCode {
  @Field({ nullable: true })
  email: string;

  @Field()
  origin: string;

  @Field()
  code: string;
}
