import { IDeleteParkingDto } from '../interfaces/delete-parking-dto.interface';

export class DeleteParkingDto implements IDeleteParkingDto {
  id: string;
  ownerId: string;
}
