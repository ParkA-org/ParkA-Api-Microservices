interface IUser {
  _id: string;

  id: string;

  name: string;

  lastName: string;

  email: string;

  profilePicture?: string;

  userInformation?: string;

  credential: string;

  confirmed: boolean;

  origin: string;
}
