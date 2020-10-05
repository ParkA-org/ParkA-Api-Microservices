import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IBaseType } from '../interfaces/base-type.interface';
import { IPaymentType } from '../interfaces/payment-type.interface';

@ObjectType('Payment')
export class PaymentType implements IPaymentType, IBaseType {
  @Field(type => ID)
  id: string;

  @Field(type => ID)
  _id: string;

  @Field()
  cardHolder: string;

  @Field()
  expirationDate: string;

  @Field()
  digit: string;

  @Field()
  activated: boolean;

  @Field()
  card: string;

  @Field()
  deleted: boolean;
}
