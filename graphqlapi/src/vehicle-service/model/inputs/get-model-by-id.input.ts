import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { IGetVehicleByIdInput } from 'src/vehicle-service/vehicle/interfaces/get-vehicle-by-id.interface';

@InputType('getModelByIdInput')
export class GetModelByIdInput implements IGetVehicleByIdInput {
  @Field()
  @IsUUID('4')
  id: string;
}
