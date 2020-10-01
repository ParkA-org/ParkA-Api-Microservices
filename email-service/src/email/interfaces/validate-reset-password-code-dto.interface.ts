export interface IValidateResetPasswordCode {
  email?: string;
  code: string;
  origin: string;
  newPassword: string;
}
