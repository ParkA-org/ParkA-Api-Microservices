import { Field, ID, InputType } from '@nestjs/graphql';
import { ICreateVehicleMakeInput } from '../vehicle-make-interfaces/create-make-input.interface';

@InputType('createVehicleMakeInput')
export class CreateVehicleMakeInput implements ICreateVehicleMakeInput {
  @Field()
  name: string;

  @Field()
  icon: string;

  @Field(type => [ID])
  models: string[];
}
