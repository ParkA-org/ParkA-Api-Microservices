import { IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateVehiclePayload implements ICreateVehiclePayload {
  @IsUUID('all')
  model: string;

  @MinLength(7)
  @MaxLength(7)
  licensePlate: string;

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
