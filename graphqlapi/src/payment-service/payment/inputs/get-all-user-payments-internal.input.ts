import { IsUUID } from 'class-validator';

export class GetAllUserPaymentInternalIpunt
  implements IGetAllUserPaymentsInternalInput {
  @IsUUID('4')
  userInformation: string;
}
