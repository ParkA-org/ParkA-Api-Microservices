export interface IPayment {
  cardHolder: string;
  digit: string;
  expirationDate: string;
  cvv: string;
  activate: boolean;
  deleted: boolean;
  typeCard: string;
  userInformation: string;
}
