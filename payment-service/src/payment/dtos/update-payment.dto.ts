import { ICreatePaymentDto } from '../interfaces/create-payment-dto.interface';
import { IUpdatePaymentDto } from '../interfaces/update-payment-dto.interface';
import { IUpdatePaymentPayload } from '../interfaces/update-payment-payload.interface';
import { UserInformationPayload } from './user-information.payload';

export class UpdatePaymentDto implements IUpdatePaymentDto {
  updatePaymentPayload: IUpdatePaymentPayload;
  userInformationPayload: UserInformationPayload;
}
