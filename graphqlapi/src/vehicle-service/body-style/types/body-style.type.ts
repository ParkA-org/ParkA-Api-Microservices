import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IBodyStyleType } from '../interfaces/body-style-type.interface';

@ObjectType()
export class BodyStyleType implements IBodyStyleType {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;
}
