import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { IGetPaymentByIdInput } from '../interfaces/get-payment-input.interface';

@InputType()
export class GetPaymentByIdInput implements IGetPaymentByIdInput {
  @Field()
  @IsUUID('4')
  id: string;
}
