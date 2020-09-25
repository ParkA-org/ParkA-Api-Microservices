import { Controller, Logger } from '@nestjs/common';
import { JsonSocket, MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { LoginType } from './types/login';

@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController');
  constructor(private authService: AuthService) {}

  @MessagePattern({ type: 'get-user' })
  public async getUser(id: string): Promise<User> {
    this.logger.debug(
      `Received id user message with data ${JSON.stringify(id)}`,
    );
    return await this.authService.getUser(id);
  }

  @MessagePattern({ type: 'get-users' })
  public async getUsers(): Promise<User[]> {
    return await this.authService.getAllUser();
  }

  @MessagePattern({ type: 'create-user' })
  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    this.logger.debug(
      `Received create user message with data ${JSON.stringify(createUserDto)}`,
    );
    return await this.authService.createUser(createUserDto);
  }

  @MessagePattern({ type: 'sign-in' })
  public async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<LoginType> {
    this.logger.debug(
      `Received login user message with data ${JSON.stringify(
        authCredentialsDto,
      )}`,
    );
    return await this.authService.signIn(authCredentialsDto);
  }

  @MessagePattern({ type: 'update-user' })
  public async updateUser(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<LoginType> {
    this.logger.debug(
      `Received login user message with data ${JSON.stringify(
        authCredentialsDto,
      )}`,
    );
    return await this.authService.signIn(authCredentialsDto);
  }
}
