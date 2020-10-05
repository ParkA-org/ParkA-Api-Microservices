export interface ICreatePaymentDto {
  cardHolder: string;
  expirationDate: string;
  card: string;
  digit: string;
  cvv: string;
}
