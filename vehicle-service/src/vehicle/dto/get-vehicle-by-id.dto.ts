import { IsUUID } from 'class-validator';

export class GetVehicleByIdDto implements IGetVehicleByIdDto {
  @IsUUID('4')
  id: string;
}
