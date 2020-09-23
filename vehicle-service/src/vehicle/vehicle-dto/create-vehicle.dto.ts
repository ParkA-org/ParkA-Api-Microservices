import {
  IsBoolean,
  IsUUID,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ICreateCarDto } from '../vehicle-interfaces/create-car-dto.interface';

export class CreateVehicleDto implements ICreateCarDto {
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
  vehicleType: string;
}
