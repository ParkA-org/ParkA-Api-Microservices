import { ICreatePaymentDto } from '../interfaces/create-payment-dto.interface';
import { CreatePaymentPayload } from './create-payment.payload';
import { UserInformationPayload } from './user-information.payload';

export class CreatePaymentDto implements ICreatePaymentDto {
  userInformationPayload: UserInformationPayload;
  createPaymentPayload: CreatePaymentPayload;
}
