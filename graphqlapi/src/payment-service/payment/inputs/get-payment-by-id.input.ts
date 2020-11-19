import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType('GetPaymentByIdInput')
export class GetPaymentByIdInput implements IGetPaymentByIdInput {
  @Field()
  @IsUUID('4')
  id: string;
}
