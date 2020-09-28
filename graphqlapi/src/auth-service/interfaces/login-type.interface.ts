import { UserType } from '../types/user.type';

export interface ILoginType {
  JWT: string;
  user: UserType;
}
