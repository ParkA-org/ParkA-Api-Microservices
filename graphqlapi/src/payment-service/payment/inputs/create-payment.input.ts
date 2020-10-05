import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';
import { ICreatePaymentInput } from '../interfaces/create-payment-input.interface';

@InputType()
export class CreatePaymentInput implements ICreatePaymentInput {
  @MinLength(2)
  @MaxLength(50)
  @Field()
  cardHolder: string;

  @Field()
  expirationDate: string;

  @MinLength(16)
  @MaxLength(16)
  @Field()
  digit: string;

  @Field()
  card: string;
}
