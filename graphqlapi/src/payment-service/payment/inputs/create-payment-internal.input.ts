import { CreatePaymentInput } from './create-payment.input';
import { UserInformationPayload } from './user-information-id.payload';

export class CreatePaymentInternalInput implements ICreatePaymentInternalInput {
  userInformationPayload: UserInformationPayload;
  createPaymentPayload: CreatePaymentInput;
}
