import { Field, InputType } from '@nestjs/graphql';
import { IResetPasswordInput } from '../interfaces/reset-password-input.interface';

@InputType()
export class ResetPasswordInput implements IResetPasswordInput {
  @Field()
  @Is
  email: string;
  origin: string;
}
