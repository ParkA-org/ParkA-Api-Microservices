import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CardType } from 'src/payment-service/card/types/card.type';

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

  @Field(type => CardType)
  card: string;

  @Field()
  deleted: boolean;
}
