export class UpdateReservationPayload implements IUpdateReservationPayload {
  checkInDate: string;
  checkOutDate: string;
  vehicle: string;
  total: number;
  paymentInfo: string;
  rentDate: string;
}
