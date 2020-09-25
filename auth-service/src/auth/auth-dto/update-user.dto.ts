import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  id: string;

  name?: string;

  lastName?: string;

  profilePicture?: string;

  password?: string;
}
