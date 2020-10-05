import { IBaseEntity } from '../interfaces/base-entity.interface';
import { IPayment } from '../interfaces/payment-entity.interface';

export class Payment implements IPayment, IBaseEntity {
  id: string;
  _id: string;
  cardHolder: string;
  digit: string;
  expirationDate: string;
  cvv: string;
  activate: boolean;
  deleted: boolean;
  typeCard: string;
  createdAt: string;
  updatedAt: string;
}
