import { IUpdateUserPasswordDto } from '../interfaces/update-user-password-dto.interface';

export class UpdateUserPasswordDto implements IUpdateUserPasswordDto {
  email: string;
  newPassword: string;
  oldPassword: string;
}
