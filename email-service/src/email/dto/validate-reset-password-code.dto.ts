import { IValidateResetPasswordCodeDto } from '../interfaces/validate-reset-password-code-dto.interface';

export class ValidateResetPasswordCodeDto
  implements IValidateResetPasswordCodeDto {
  email?: string;

  origin: string;

  code: string;

  newPassword: string;
}
