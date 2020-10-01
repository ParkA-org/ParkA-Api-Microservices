export class ValidateResetPasswordCode implements IValidateResetPasswordCode {
  email?: string;

  origin: string;

  code: string;

  newPassword: string;
}
