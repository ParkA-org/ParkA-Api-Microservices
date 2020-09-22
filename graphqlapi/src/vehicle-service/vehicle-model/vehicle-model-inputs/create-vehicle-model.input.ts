import { Field, InputType } from '@nestjs/graphql';
import { IsUUID, MinLength } from 'class-validator';
import { ICreateVehicleModelInput } from '../vehicle-model-interfaces/create-vehicle-model-input.entity';

@InputType('createVehicleModelInput')
export class CreateVehicleModelInput implements ICreateVehicleModelInput {
  @Field()
  @IsUUID('4')
  make: string;

  @Field()
  @MinLength(2)
  name: string;
}
