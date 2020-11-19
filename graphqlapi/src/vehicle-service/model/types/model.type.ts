import { Field, ID, ObjectType } from '@nestjs/graphql';
import { MakeType } from 'src/vehicle-service/make/types/make.type';

@ObjectType('Model')
export class ModelType implements IModelType {
  @Field(type => ID)
  id: string;

  @Field(type => MakeType)
  make: string;

  @Field()
  name: string;
}
