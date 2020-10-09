import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { IDeletePaymentInput } from '../interfaces/delete-payment-input.interface';

@InputType()
export class DeletePaymentInput implements IDeletePaymentInput {
  @Field()
  @IsUUID('4')
  id: string;
}
