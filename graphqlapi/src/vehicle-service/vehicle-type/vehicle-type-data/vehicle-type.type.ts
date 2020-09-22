import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IVehicleTypeType } from '../vehicle-type-interfaces/vehicle-type-type.interface';

@ObjectType()
export class VehicleTypeType implements IVehicleTypeType {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;
}
