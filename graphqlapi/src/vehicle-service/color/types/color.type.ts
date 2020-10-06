import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ColorType implements IColorType {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;
}
