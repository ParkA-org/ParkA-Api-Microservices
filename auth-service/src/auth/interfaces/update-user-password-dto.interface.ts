export interface IUpdateUserPasswordDto {
  email: string;

  newPassword: string;

  oldPassword: string;
}
