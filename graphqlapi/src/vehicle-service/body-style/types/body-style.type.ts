import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BodyStyleType implements IBodyStyleType {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;
}
