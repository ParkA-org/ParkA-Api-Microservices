import { IsEmail } from 'class-validator';
import { ICreateResetPasswordDto } from '../interfaces/create-reset-password-dto.interface';

export class CreateResetPasswordDto implements ICreateResetPasswordDto {
  @IsEmail()
  email: string;

  origin: string;
}
