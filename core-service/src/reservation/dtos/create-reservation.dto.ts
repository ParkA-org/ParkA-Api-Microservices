import { ICreateReservationDto } from '../interfaces/create-reservation-dto.interface-dto';
import { ReservationStatuses } from '../utils/statuses';

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

  status: ReservationStatuses;
}
