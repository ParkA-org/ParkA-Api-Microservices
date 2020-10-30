interface IUpdateReservationDto {
  where: {
    id: string;
  };
  data: {
    checkInDate: string;
    checkOutDate: string;
    vehicle: string;
    total: number;
    paymentInfo: string;
    rentDate: string;
  };
}
