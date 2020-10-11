export class ValidateResetPasswordCodeDto
  implements IValidateResetPasswordCodeDto {
  email?: string;

  origin: string;

  code: string;

  newPassword: string;
}
