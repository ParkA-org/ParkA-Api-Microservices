import { MinLength } from 'class-validator';
import { ICreateVehicleTypeDto } from '../interfaces/create-vehicle-type-dto.interface';

export class CreateVehicleTypeDto implements ICreateVehicleTypeDto {
  @MinLength(1)
  name: string;
}
