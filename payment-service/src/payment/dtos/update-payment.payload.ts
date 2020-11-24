import { IsUUID, MaxLength, MinLength } from 'class-validator';
import { IUpdatePaymentPayload } from '../interfaces/update-payment-payload.interface';

export class UpdatePaymentPayload implements IUpdatePaymentPayload {
  @IsUUID('all')
  id: string;

  expirationDate: string;
}
