import { IsUUID } from 'class-validator';
import { IGetVehicleByIdDto } from 'src/vehicle/vehicle-interfaces/get-vehicle-by-id-dto.interface';

export class GetVehicleTypeById implements IGetVehicleByIdDto {
  @IsUUID('4')
  id: string;
}
