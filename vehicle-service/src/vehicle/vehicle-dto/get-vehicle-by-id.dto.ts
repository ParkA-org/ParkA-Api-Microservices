import { IGetVehicleByIdDto } from '../vehicle-interfaces/get-vehicle-by-id-dto.interface';

export class GetVehicleByIdDto implements IGetVehicleByIdDto {
  id: string;
}
