import { Field, ID, ObjectType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import { IBaseType } from 'src/payment-service/payment/interfaces/base-type.interface';
import { ICardType } from '../interfaces/card-type.interface';

@ObjectType('Card')
export class CardType implements ICardType, IBaseType {
  @Field(type => ID)
  id: string;

  @Field(type => ID)
  _id: string;

  @MinLength(2)
  @Field()
  name: string;
}
