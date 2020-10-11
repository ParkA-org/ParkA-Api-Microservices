import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ICardType } from '../interfaces/card-type.interface';

@ObjectType('Card')
export class CardType implements ICardType {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;
}
