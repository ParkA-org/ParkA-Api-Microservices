import { Field, InputType } from '@nestjs/graphql';
import { IGetPaymentByIdInput } from '../interfaces/get-payment-input.interface';

@InputType()
export class GetPaymentByIdInput implements IGetPaymentByIdInput {
  @Field()
  id: string;
}
