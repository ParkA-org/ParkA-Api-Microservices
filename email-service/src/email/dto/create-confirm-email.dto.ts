import { IsEmail, IsOptional, MaxLength, MinLength } from 'class-validator';
import { ICreateUserDto } from '../interfaces/create-user-dto.interface';

export class CreateConfirmEmailDto implements ICreateUserDto {
  @IsEmail()
  email: string;

  origin: string;
}
