export interface IUpdateUserInput {
  id: string;

  name?: string;

  lastName?: string;

  profilePicture?: string;

  newPassword?: string;

  oldPassword?: string;
}
