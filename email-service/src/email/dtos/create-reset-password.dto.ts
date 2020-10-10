import { IsEmail } from 'class-validator';
export class CreateResetPasswordDto implements ICreateResetPasswordDto {
  @IsEmail()
  email: string;

  origin: string;
}
