import { IsUUID } from 'class-validator';

export class GetAllUserPaymentInternalInput
  implements IGetAllUserPaymentsInternalInput {
  @IsUUID('4')
  userInformation: string;
}
