export interface IUser {
  _id: string;

  id: string;

  name: string;

  lastName: string;

  email: string;

  profilePicture?: string;

  accountData?: string;

  credential: string;

  password: string;

  confirmed: boolean;
}
