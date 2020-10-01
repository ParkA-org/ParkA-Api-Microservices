export interface IValidateResetPasswordCodeInput {
  email: string;
  origin: string;
  code: string;
  newPassword: string;
}
