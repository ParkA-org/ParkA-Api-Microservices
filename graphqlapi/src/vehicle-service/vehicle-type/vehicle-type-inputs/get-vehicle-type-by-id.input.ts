import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { IGetVehicleTypeByIdInput } from '../vehicle-type-interfaces/get-vehicle-type-by-id-input.interface';

@InputType('getVehicleTypeByIdInput')
export class GetVehicleTypeByIdInput implements IGetVehicleTypeByIdInput {
  @IsUUID('4')
  @Field()
  id: string;
}
