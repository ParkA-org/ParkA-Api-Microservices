export class CreateReservationInternalInput
  implements ICreateReservationInternalInput {
  client: string;
  parking: string;
  owner: string;
  checkInDate: string;
  checkOutDate: string;
  vehicle: string;
  paymentInfo: string;
  total: number;
  rentDate: string;
}
