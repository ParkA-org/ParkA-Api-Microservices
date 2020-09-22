import { Field, InputType } from '@nestjs/graphql';
import { ICreateVehicleTypeInput } from '../vehicle-type-interfaces/create-vehicle-type-input.interface';

@InputType('createVehicleInputType')
export class CreateVehicleTypeInput implements ICreateVehicleTypeInput {
  @Field()
  name: string;
}
