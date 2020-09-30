import { IValidateEmailCode } from '../interfaces/validate-email-code-dto.interface';

export class ValidateEmailCode implements IValidateEmailCode {
  email?: string;

  origin: string;

  code: string;
}
