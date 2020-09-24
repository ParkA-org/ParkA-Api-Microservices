import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IModelType } from '../interfaces/model-type.interface';

@ObjectType()
export class ModelType implements IModelType {
  @Field(type => ID)
  id: string;

  @Field()
  make: string;

  @Field()
  name: string;
}
