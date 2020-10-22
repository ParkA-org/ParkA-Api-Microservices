import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType('DeletePaymentInput')
export class DeletePaymentInput implements IDeletePaymentInput {
  @Field()
  @IsUUID('4')
  id: string;
}
