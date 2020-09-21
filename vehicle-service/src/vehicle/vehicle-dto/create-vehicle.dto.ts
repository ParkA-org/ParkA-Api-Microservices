import { IsBoolean, IsUUID, Length } from 'class-validator';

export class CreateVehicleDto {
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

  @Length(4)
  year: number;

  alias: string;

  @IsUUID('all')
  vehicleType: string;
}
