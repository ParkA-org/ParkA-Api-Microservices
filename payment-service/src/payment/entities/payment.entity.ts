import { IBaseEntity } from '../interfaces/base-entity.interface';
import { IPayment } from '../interfaces/payment-entity.interface';

export class Payment implements IPayment, IBaseEntity {
  createdAt: string;
  updatedAt: string;
}
