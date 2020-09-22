import { MinLength } from 'class-validator';
import { ICreateVehicleTypeDto } from '../vehicle-type-interfaces/create-vehicle-type-dto.interface';

export class CreateVehicleTypeDto implements ICreateVehicleTypeDto {
  @MinLength(1)
  name: string;
}
