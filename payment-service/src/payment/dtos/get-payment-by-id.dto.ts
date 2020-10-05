import { IsUUID } from 'class-validator';
import { IGetPaymentByIdDto } from '../interfaces/get-payment-by-id-dto.interface';

export class GetPaymentByIdDto implements IGetPaymentByIdDto {
  @IsUUID('all')
  id: string;
}
