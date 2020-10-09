import { IsUrl, IsUUID, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto implements IUpdateUserDto {
  @IsUUID('4')
  id: string;

  @MinLength(2)
  @MaxLength(50)
  name: string;

  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @IsUrl()
  profilePicture: string;

  origin: string;
}
