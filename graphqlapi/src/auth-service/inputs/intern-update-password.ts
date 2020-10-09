import { IsEmail, MinLength } from 'class-validator';
import { IInternUpdatePassword } from '../interfaces/intern-update-password.interface';

export class InternUpdatePassword implements IInternUpdatePassword {
  @IsEmail()
  email: string;

  @MinLength(8)
  newPassword: string;

  @MinLength(8)
  oldPassword: string;
}
