export class UpdateReservationPayload implements IUpdateReservationPayload {
  reviewed: boolean;
  checkInDate: string;
  checkOutDate: string;
  vehicle: string;
  total: number;
  paymentInfo: string;
  rentDate: string;
}
