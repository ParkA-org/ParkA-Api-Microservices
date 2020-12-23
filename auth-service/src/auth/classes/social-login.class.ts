import { User } from '../entities/user.entity';
import { ISocialLogin } from '../interfaces/social-login-response.interface';

export class SocialLogin implements ISocialLogin {
  JWT: string;
  register: string;
  user: User;
}
