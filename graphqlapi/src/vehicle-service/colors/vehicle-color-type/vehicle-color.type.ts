import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IVehicleColorType } from '../interfaces/vehicle-color-type.interface';

@ObjectType()
export class VehicleColorType implements IVehicleColorType {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;
}
