import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDateString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { IUpdatePaymentInput } from '../interfaces/update-payment-input.interface';

@InputType('UpdatePaymentInput')
export class UpdatePaymentInput implements IUpdatePaymentInput {
  @Field(type => ID)
  @IsUUID()
  id: string;

  @Field()
  @MinLength(2)
  @MaxLength(50)
  cardHolder: string;

  @Field()
  @IsDateString()
  expirationDate: string;

  @Field()
  @MinLength(16)
  @MaxLength(17)
  digit: string;

  @Field()
  card: string;

  @Field()
  @MinLength(3)
  @MaxLength(4)
  cvv: string;
}
