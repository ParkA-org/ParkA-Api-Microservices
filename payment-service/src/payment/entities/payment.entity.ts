import { IBaseEntity } from '../interfaces/base-entity.interface';
import { IPayment } from '../interfaces/payment-entity.interface';

export class Payment implements IPayment, IBaseEntity {
  salt: string;
  id: string;
  _id: string;
  cardHolder: string;
  digit: string;
  expirationDate: string;
  cvv: string;
  activated: boolean;
  deleted: boolean;
  card: string;
  createdAt: string;
  updatedAt: string;
}
