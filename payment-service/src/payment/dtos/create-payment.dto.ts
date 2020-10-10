import { MaxLength, MinLength } from 'class-validator';
import { IsUUID } from 'class-validator';
import { CreatePaymentPayload } from './create-payment.payload';
import { UserInformationPayload } from './user-information.payload';

export class CreatePaymentDto implements ICreatePaymentDto {
  userInformationPayload: UserInformationPayload;
  createPaymentPayload: CreatePaymentPayload;
}
