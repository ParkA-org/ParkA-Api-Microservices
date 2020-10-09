import { IsUrl, IsUUID, MaxLength, MinLength } from 'class-validator';
import { IInternUpdateUser } from '../interfaces/intern-update-user.interface';

export class InternUpdateUser implements IInternUpdateUser {
  id: string;

  name: string;

  lastName: string;

  profilePicture: string;

  origin: string;
}
