import { User } from '../entities/user.entity';

export interface ISocialLogin {
  JWT: string;
  register: boolean;
  user: User;
}
