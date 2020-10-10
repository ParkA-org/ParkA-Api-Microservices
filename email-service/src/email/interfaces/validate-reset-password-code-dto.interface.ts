interface IValidateResetPasswordCodeDto {
  email?: string;
  code: string;
  origin: string;
  newPassword: string;
}
