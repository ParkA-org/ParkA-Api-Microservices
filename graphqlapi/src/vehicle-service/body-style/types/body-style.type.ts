import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('BodyStyle')
export class BodyStyleType implements IBodyStyleType {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;
}
