import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { IGetVehicleByIdInput } from '../interfaces/get-vehicle-by-id.interface';

@InputType('getVehicleByIdInput')
export class GetVehicleByIdInput implements IGetVehicleByIdInput {
  @IsUUID('4')
  @Field()
  id: string;
}
