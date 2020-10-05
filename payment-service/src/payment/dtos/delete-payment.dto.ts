import { IsUUID } from 'class-validator';
import { IDeletePaymentDto } from '../interfaces/detele-payment-dto.interface';

export class DeletePaymentDto implements IDeletePaymentDto {
  @IsUUID('all')
  id: string;
}
