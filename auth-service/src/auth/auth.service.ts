import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './userData/create-user.dto';
import { User } from './userData/user.entity';
import { v4 as uuid } from 'uuid';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
  ) {}

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    this.logger.debug(
      `Received create user payload ${JSON.stringify(createUserDto)}`,
    );
    const { name, email, lastName, profilePicture } = createUserDto;

    try {
      const user = this.authRepository.save({
        id: uuid(),
        name,
        lastName,
        email,
        profilePicture,
      });

      return await user;
    } catch (error) {
      throw error.code === 11000
        ? new RpcException('Duplicate field')
        : new RpcException('An undefined error occured');
    }
  }
}
