import { Field, InputType } from '@nestjs/graphql';
import { ICreateVehicleColorInput } from '../vehicle-color-interfaces/create-vehicle-color-input.interface';

@InputType('createVehicleColorInput')
export class CreateVehicleColorInput implements ICreateVehicleColorInput {
  @Field()
  name: string;
}
