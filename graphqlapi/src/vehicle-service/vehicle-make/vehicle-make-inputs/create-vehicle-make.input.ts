import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID, MinLength } from 'class-validator';
import { ICreateVehicleMakeInput } from '../vehicle-make-interfaces/create-make-input.interface';

@InputType('createVehicleMakeInput')
export class CreateVehicleMakeInput implements ICreateVehicleMakeInput {
  @Field()
  @MinLength(4)
  name: string;

  @Field()
  icon: string;

  @Field(type => [ID])
  @IsUUID('4', { each: true })
  models: string[];
}
