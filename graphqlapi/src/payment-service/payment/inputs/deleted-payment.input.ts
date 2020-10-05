import { Field, InputType } from '@nestjs/graphql';
import { IDeletedPaymentInput } from '../interfaces/deleted-payment-input.interface';

@InputType()
export class DeletedPaymentInput implements IDeletedPaymentInput {
  @Field()
  id: string;
}
