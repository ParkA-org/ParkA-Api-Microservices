import { IInternUpdateUser } from '../interfaces/intern-update-user.interface';

export class InternUpdateUser implements IInternUpdateUser {
  id: string;

  name?: string;

  lastName?: string;

  profilePicture?: string;

  origin: string;
}
