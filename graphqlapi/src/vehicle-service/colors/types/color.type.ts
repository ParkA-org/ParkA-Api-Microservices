import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IColorType } from '../interfaces/color-type.interface';

@ObjectType()
export class ColorType implements IColorType {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;
}
