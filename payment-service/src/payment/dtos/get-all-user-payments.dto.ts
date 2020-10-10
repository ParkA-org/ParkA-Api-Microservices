import { IsUUID } from 'class-validator';

export class GetAllUserPaymentsDto implements IGetAllUserPaymentsDto {
  @IsUUID('4')
  userInformation: string;
}
