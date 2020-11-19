import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { IConfirmEmailInput } from '../interfaces/confirm-email-input.interface';

@InputType('ConfirmEmailInput')
export class ConfirmEmailInput implements IConfirmEmailInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  origin: string;
}
