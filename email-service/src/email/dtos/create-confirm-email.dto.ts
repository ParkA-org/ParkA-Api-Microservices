import { IsEmail } from 'class-validator';

export class CreateConfirmEmailDto implements ICreateConfirmEmailDto {
  @IsEmail()
  email: string;

  origin: string;
}
