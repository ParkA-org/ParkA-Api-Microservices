import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IVehicleMakeType } from '../vehicle-make-interfaces/vehicle-make-type.interface';

@ObjectType()
export class VehicleMakeType implements IVehicleMakeType {
  @Field(type => ID)
  id: string;

  @Field()
  icon: string;

  @Field()
  name: string;

  @Field(type => [ID])
  models: string[];
}
