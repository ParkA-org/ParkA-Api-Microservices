import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Model')
export class ModelType implements IModelType {
  @Field(type => ID)
  id: string;

  @Field()
  make: string;

  @Field()
  name: string;
}
