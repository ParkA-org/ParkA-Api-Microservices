import { MaxLength, MinLength } from 'class-validator';
import { IsUUID } from 'class-validator/types/decorator/string/IsUUID';
import { ICreatePaymentDto } from '../interfaces/create-payment-dto.interface';

export class CreatePaymentDto implements ICreatePaymentDto {
  @MinLength(2)
  @MaxLength(50)
  cardHolder: string;

  expirationDate: string;

  @IsUUID('all')
  card: string;

  @MinLength(16)
  @MaxLength(16)
  digit: string;

  @MinLength(3)
  @MaxLength(4)
  cvv: string;
}
