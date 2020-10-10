import {
  IsEmail,
  IsUrl,
  IsUUID,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class CreateUserDto implements ICreateUserDto {
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @IsEmail()
  email: string;

  @ValidateIf((input: CreateUserDto) => input.profilePicture !== undefined)
  @IsUrl()
  profilePicture: string;

  @IsUUID('4')
  userInformation: string;

  @MinLength(8)
  password: string;

  origin: string;
}
