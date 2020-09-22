import { IsBoolean, IsUUID, Length } from 'class-validator';
import { ICreateCarDto } from '../vehicle-interfaces/create-car-dto.interface';

export class CreateVehicleDto implements ICreateCarDto {
  @IsUUID('all')
  model: string;

  licensePlate: string;

  @IsBoolean()
  verified: boolean;

  detail: string;

  @IsUUID('all')
  colorExterior: string;

  mainPicture: string;

  pictures: string[];

  year: string;

  alias: string;

  @IsUUID('all')
  vehicleType: string;
}
