import { InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { IGetVehicleByIdInput } from 'src/vehicle-service/vehicle/interfaces/get-vehicle-by-id.interface';

@InputType('getVehicleColorByIdInput')
export class GetVehicleColorByIdInput implements IGetVehicleByIdInput {
  @IsUUID('4')
  id: string;
}
