import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @IsEmail()
  email: string;

  profilePicture: string;

  password: string;
}
