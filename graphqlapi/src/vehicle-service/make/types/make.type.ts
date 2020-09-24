import { Field, ID, ObjectType } from '@nestjs/graphql';
import { VehicleModelType } from 'src/vehicle-service/vehicle-model/vehicle-model-data/vehicle-model.type';
import { IMakeType } from '../interfaces/make-type.interface';

@ObjectType()
export class MakeType implements IMakeType {
  @Field(type => ID)
  id: string;

  @Field()
  icon: string;

  @Field()
  name: string;

  @Field(type => [VehicleModelType])
  models: string[];
}
