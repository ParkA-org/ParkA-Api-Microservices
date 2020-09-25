import { IsUUID } from 'class-validator';
import { IGetVehicleByIdDto } from 'src/vehicle/interfaces/get-vehicle-by-id-dto.interface';

export class GetBodyStyleByIdDto implements IGetVehicleByIdDto {
  @IsUUID('4')
  id: string;
}
