import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsDateString,
  IsUUID,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { IUpdatePaymentInput } from '../interfaces/update-payment-input.interface';

@InputType('UpdatePaymentInput')
export class UpdatePaymentInput implements IUpdatePaymentInput {
  @Field(type => ID)
  @IsUUID()
  id: string;

  @Field({ nullable: true })
  @ValidateIf((input: UpdatePaymentInput) => input.cardHolder !== undefined)
  @MinLength(2)
  @MaxLength(50)
  cardHolder: string;

  @Field({ nullable: true })
  @ValidateIf((input: UpdatePaymentInput) => input.expirationDate !== undefined)
  @IsDateString()
  expirationDate: string;

  @Field({ nullable: true })
  @ValidateIf((input: UpdatePaymentInput) => input.digit !== undefined)
  @MinLength(16)
  @MaxLength(17)
  digit: string;

  @Field({ nullable: true })
  card: string;

  @Field({ nullable: true })
  @ValidateIf((input: UpdatePaymentInput) => input.cvv !== undefined)
  @MinLength(3)
  @MaxLength(4)
  cvv: string;
}
