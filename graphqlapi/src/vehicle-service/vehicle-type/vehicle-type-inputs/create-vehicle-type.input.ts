import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import { ICreateVehicleTypeInput } from '../vehicle-type-interfaces/create-vehicle-type-input.interface';

@InputType('createVehicleTypeInput')
export class CreateVehicleTypeInput implements ICreateVehicleTypeInput {
  @Field()
  @MinLength(2)
  name: string;
}
