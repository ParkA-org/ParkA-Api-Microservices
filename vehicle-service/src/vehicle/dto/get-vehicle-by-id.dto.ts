import { IsUUID } from 'class-validator';
import { IGetVehicleByIdDto } from '../interfaces/get-vehicle-by-id-dto.interface';

export class GetVehicleByIdDto implements IGetVehicleByIdDto {
  @IsUUID('4')
  id: string;
}
