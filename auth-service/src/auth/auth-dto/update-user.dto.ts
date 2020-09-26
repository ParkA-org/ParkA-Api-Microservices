import { IUpdateUserDto } from '../interfaces/update-user-dto.interface';

export class UpdateUserDto implements IUpdateUserDto {
  id: string;
  name?: string;
  lastName?: string;
  profilePicture?: string;
  password?: string;
}
