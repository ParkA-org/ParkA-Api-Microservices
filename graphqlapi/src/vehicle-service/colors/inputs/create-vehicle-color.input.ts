import { Field, InputType } from '@nestjs/graphql';
import { ICreateVehicleColorInput } from '../interfaces/create-vehicle-color-input.interface';

@InputType('createVehicleColorInput')
export class CreateVehicleColorInput implements ICreateVehicleColorInput {
  @Field()
  name: string;
}
