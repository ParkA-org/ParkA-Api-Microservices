import { IsEmail } from 'class-validator';
import { ICreateConfirmEmailDto } from '../interfaces/create-confirm-email-dto.interface';

export class CreateConfirmEmailDto implements ICreateConfirmEmailDto {
  @IsEmail()
  email: string;

  origin: string;
}
