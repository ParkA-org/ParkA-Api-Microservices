import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { IsNull } from 'typeorm';

export class CreateUserDto {
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @IsEmail()
  email: string;

  profilePicture?: string;

  @MinLength(8)
  password: string;
}
