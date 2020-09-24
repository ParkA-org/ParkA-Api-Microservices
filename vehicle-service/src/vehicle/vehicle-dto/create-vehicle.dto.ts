import { IsBoolean, IsUUID, MaxLength, MinLength } from 'class-validator';
import { ICreateVehicleDto } from '../vehicle-interfaces/create-vehicle-dto.interface';

export class CreateVehicleDto implements ICreateVehicleDto {
  @IsUUID('all')
  model: string;

  @MinLength(7)
  @MaxLength(7)
  licensePlate: string;

  @IsBoolean()
  verified: boolean;

  detail: string;

  @IsUUID('all')
  colorExterior: string;

  mainPicture: string;

  pictures: string[];

  @MinLength(4)
  @MaxLength(4)
  year: string;

  alias: string;

  @IsUUID('all')
  bodyStyle: string;
}
