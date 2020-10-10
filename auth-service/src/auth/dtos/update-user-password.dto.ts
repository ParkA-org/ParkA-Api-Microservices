import { IsEmail, MinLength } from 'class-validator';

export class UpdateUserPasswordDto implements IUpdateUserPasswordDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  newPassword: string;

  @MinLength(8)
  oldPassword: string;
}
