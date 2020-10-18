import { Controller, Logger } from '@nestjs/common';
import { JsonSocket, MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dtos/auth-credential.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import { LoginType } from './login-class/login';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UpdateUserPasswordDto } from './dtos/update-user-password.dto';

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

  @MessagePattern({ type: 'get-user-by-userInformation' })
  public async getUserByUserInformation(id: string): Promise<User> {
    this.logger.debug(
      `Received id UserInformation message with data ${JSON.stringify(id)}`,
    );
    return await this.authService.getUserByUserInformation(id);
  }

  @MessagePattern({ type: 'get-users' })
  public async getUsers(): Promise<User[]> {
    return await this.authService.getAllUser();
  }

  @MessagePattern({ type: 'create-user' })
  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.createUser(createUserDto);
  }

  @MessagePattern({ type: 'sign-in' })
  public async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<LoginType> {
    return await this.authService.signIn(authCredentialsDto);
  }

  @MessagePattern({ type: 'update-user' })
  public async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    this.logger.debug(
      `Received Update User message with data ${JSON.stringify(updateUserDto)}`,
    );
    return await this.authService.updateUser(updateUserDto);
  }

  @MessagePattern({ type: 'update-user-password' })
  public async updateUserPassword(
    updateUserPasswordDto: UpdateUserPasswordDto,
  ): Promise<User> {
    return await this.authService.updateUserPassword(updateUserPasswordDto);
  }
}
