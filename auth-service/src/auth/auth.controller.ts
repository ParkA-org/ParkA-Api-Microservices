import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { User } from './userData/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern({ type: 'get-user' })
  public async getCatalogItems(): Promise<{}> {
    return { id: 'helloworld v:' };
  }

  @MessagePattern({ type: 'create-user' })
  public async createUser(): Promise<User> {
    return {
      id: '12345',
      name: 'test name',
      lastName: 'test lastName',
      email: 'uncorreoporahi@gmail.com',
      profilePicture: '',
    };
  }
}
