import { IsUUID, MaxLength, MinLength } from 'class-validator';

export class UpdateVehiclePayload implements IUpdateVehiclePayload {
  @MaxLength(100)
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
  bodyStyle: string;

  @MaxLength(4)
  @MinLength(4)
  year: string;
}
