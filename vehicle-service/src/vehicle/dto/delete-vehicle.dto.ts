import { IDeleteVehicleDto } from '../interfaces/delete-vehicle-dto.interface';

export class DeleteVehicleDto implements IDeleteVehicleDto {
  id: string;
  ownerId: string;
}
