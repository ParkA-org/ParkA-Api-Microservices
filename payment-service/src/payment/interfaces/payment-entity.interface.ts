export interface IPayment {
  cardHolder: string;
  digit: string;
  expirationDate: string;
  cvv: string;
  activated: boolean;
  deleted: boolean;
  card: string;
  salt: string;
}
