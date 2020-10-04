import { IValidateEmailCodeDto } from '../interfaces/validate-email-code-dto.interface';

export class ValidateEmailCodeDto implements IValidateEmailCodeDto {
  email?: string;

  origin: string;

  code: string;
}
