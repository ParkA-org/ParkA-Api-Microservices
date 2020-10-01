import { IValidateResetPasswordCode } from '../interfaces/validate-reset-password-code-dto.interface';

export class ValidateResetPasswordCode implements IValidateResetPasswordCode {
  email?: string;

  origin: string;

  code: string;

  newPassword: string;
}
