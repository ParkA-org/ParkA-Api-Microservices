import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { CreateUserDto } from './userData/create-user.dto';
import { User } from './userData/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern({ type: 'get-user' })
  public async getCatalogItems(): Promise<{}> {
    return { id: 'helloworld v:' };
  }

  @MessagePattern({ type: 'create-user' })
  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.createUser(createUserDto);
  }
}
