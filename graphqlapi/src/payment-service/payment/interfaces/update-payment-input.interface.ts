export interface IUpdatePaymentInput {
  id: string;
  cardHolder: string;
  digit: string;
  cvv: string;
  expirationDate: string;
  card: string;
}
