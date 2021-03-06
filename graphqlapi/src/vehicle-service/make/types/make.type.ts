import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ModelType } from 'src/vehicle-service/model/types/model.type';

@ObjectType('Make')
export class MakeType implements IMakeType {
  @Field(type => ID)
  id: string;

  @Field()
  icon: string;

  @Field()
  name: string;

  @Field(type => [ModelType])
  models: string[];
}
