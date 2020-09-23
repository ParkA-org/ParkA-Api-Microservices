import { IsUUID } from 'class-validator';
import { IGetVehicleByIdDto } from '../vehicle-interfaces/get-vehicle-by-id-dto.interface';

export class GetVehicleByIdDto implements IGetVehicleByIdDto {
  @IsUUID('4')
  id: string;
}
