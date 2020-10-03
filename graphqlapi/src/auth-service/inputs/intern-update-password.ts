import { IInternUpdatePassword } from '../interfaces/intern-update-password.interface';

export class InternUpdatePassword implements IInternUpdatePassword {
  email: string;

  newPassword: string;

  oldPassword: string;
}
