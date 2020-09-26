import { ICreateAuthCredentialDto } from '../interfaces/auth-credential-dto.interface';

export class AuthCredentialsDto implements ICreateAuthCredentialDto {
  email: string;
  password: string;
}
