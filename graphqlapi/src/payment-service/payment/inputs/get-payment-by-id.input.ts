import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class GetPaymentByIdInput implements IGetPaymentByIdInput {
  @Field()
  @IsUUID('4')
  id: string;
}
