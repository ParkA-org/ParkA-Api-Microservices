import { ReservationStatuses } from '../utils/statuses';

export interface IReservation {
  _id: string;

  id: string;

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

  reviewed: boolean;
}
