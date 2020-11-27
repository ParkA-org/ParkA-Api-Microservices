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

  @Field()
  @IsDateString()
  expirationDate: string;
}
