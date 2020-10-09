export class UpdateUserPasswordDto implements IUpdateUserPasswordDto {
  email: string;
  newPassword: string;
  oldPassword: string;
}
