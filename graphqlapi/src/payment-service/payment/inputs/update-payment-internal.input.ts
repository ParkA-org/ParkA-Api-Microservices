import { IUpdatePaymentInput } from '../interfaces/update-payment-input.interface';
import { IUpdatePaymentInternalInput } from '../interfaces/update-payment-internal-input.interface';
import { CreatePaymentInput } from './create-payment.input';
import { UserInformationPayload } from './user-information-id.payload';

export class UpdatePaymentInternalInput implements IUpdatePaymentInternalInput {
  updatePaymentPayload: IUpdatePaymentInput;
  userInformationPayload: UserInformationPayload;
}
