import { IsUUID } from 'class-validator';

export class GetPaymentByIdDto implements IGetPaymentByIdDto {
  @IsUUID('all')
  id: string;
}
