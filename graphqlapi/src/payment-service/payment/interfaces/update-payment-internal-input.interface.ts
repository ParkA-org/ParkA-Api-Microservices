import { IUpdatePaymentInput } from './update-payment-input.interface';

export interface IUpdatePaymentInternalInput {
  userInformationPayload: IUserInformationPayload;
  updatePaymentPayload: IUpdatePaymentInput;
}
