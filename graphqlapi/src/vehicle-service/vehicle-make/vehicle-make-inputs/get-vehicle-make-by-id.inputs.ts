import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { IGetVehicleMakeByIdInput } from '../vehicle-make-interfaces/get-vehicle-make-by-id';

@InputType()
export class GetVehicleMakeByIdInput implements IGetVehicleMakeByIdInput {
  @IsUUID('4')
  @Field()
  id: string;
}
