import { IUpdatePaymentPayload } from './update-payment-payload.interface';

export interface IUpdatePaymentDto {
  userInformationPayload: IUserInformationPayload;
  updatePaymentPayload: IUpdatePaymentPayload;
}
