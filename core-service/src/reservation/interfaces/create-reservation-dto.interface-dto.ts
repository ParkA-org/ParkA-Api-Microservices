export interface ICreateReservationDto {
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
