export class ValidateEmailCodeDto implements IValidateEmailCodeDto {
  email?: string;

  origin: string;

  code: string;
}
