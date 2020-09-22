import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IVehicleModelType } from '../vehicle-model-interfaces/vehicle-model-type.interface';

@ObjectType()
export class VehicleModelType implements IVehicleModelType {
  @Field(type => ID)
  id: string;

  @Field()
  make: string;

  @Field()
  name: string;
}
