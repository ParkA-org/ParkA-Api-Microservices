import { IsUUID, MaxLength, MinLength } from 'class-validator';
import { IUpdateVehicleInput } from '../interfaces/update-vehicle-input.interface';

export class UpdateVehicleInput implements IUpdateVehicleInput {
  @IsUUID('4')
  id: string;

  alias: string;

  @IsUUID('4')
  colorExterior: string;

  detail: string;

  @MaxLength(7)
  @MinLength(7)
  licensePlate: string;

  mainPicture: string;

  @IsUUID('4')
  model: string;
  pictures: string[];

  @IsUUID('4')
  vehicleType: string;

  verified: boolean;

  @MaxLength(4)
  @MinLength(4)
  year: string;
}
