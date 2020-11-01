import { ICreateReservationDto } from '../interfaces/create-reservation-dto.interface-dto';

export class CreateReservationDto implements ICreateReservationDto {
  parking: string;

  client: string;

  owner: string;

  checkInDate: string;

  checkOutDate: string;

  vehicle: string;

  paymentInfo: string;

  total: number;

  rentDate: string;
}
