import { Field, InputType } from '@nestjs/graphql';
import { IDeletePaymentInput } from '../interfaces/delete-payment-input.interface';

@InputType()
export class DeletePaymentInput implements IDeletePaymentInput {
  @Field()
  id: string;
}
