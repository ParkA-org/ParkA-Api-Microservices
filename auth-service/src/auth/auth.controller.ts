import { Controller, Logger } from '@nestjs/common';
import { JsonSocket, MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { CreateUserDto } from './userData/create-user.dto';
import { User } from './userData/user.entity';

@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController');
  constructor(private authService: AuthService) {}

  @MessagePattern({ type: 'get-user' })
  public async getCatalogItems(): Promise<{}> {
    return { id: 'helloworld v:' };
  }

  @MessagePattern({ type: 'create-user' })
  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    this.logger.debug(
      `Received create user message with data ${JSON.stringify(createUserDto)}`,
    );
    return await this.authService.createUser(createUserDto);
  }
}
