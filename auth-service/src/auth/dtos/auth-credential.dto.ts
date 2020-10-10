import { IsEmail, MinLength } from 'class-validator';

export class AuthCredentialsDto implements ICreateAuthCredentialDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}
