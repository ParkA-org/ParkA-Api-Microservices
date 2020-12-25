import { IsUUID } from 'class-validator';

export class DeletePaymentDto implements IDeletePaymentDto {
  @IsUUID('all')
  id: string;
  ownerId: string;
}
