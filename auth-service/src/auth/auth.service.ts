import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './userData/create-user.dto';
import { User } from './userData/user.entity';
import { v4 as uuid } from 'uuid';
import { RpcException } from '@nestjs/microservices';
import { UpdateUserDto } from './userData/update-user.dto';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
  ) {}

  // Is Inprogress
  public async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    this.logger.debug(
      `Received create user payload ${JSON.stringify(updateUserDto)}`,
    );
    const { name, email, lastName, profilePicture } = updateUserDto;

    var date = new Date();
    try {
      const user = this.authRepository.save({
        id: uuid(),
        name,
        lastName,
        email,
        profilePicture,
        updateAt: date.getTime(),
      });

      return await user;
    } catch (error) {
      throw error.code === 11000
        ? new RpcException('Duplicate field')
        : new RpcException('An undefined error occured');
    }
  }

  // Is Inprogress
  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    this.logger.debug(
      `Received create user payload ${JSON.stringify(createUserDto)}`,
    );
    const { name, email, lastName, profilePicture } = createUserDto;

    var date = new Date();

    try {
      const user = this.authRepository.save({
        id: uuid(),
        name,
        lastName,
        email,
        profilePicture,
        createAt: date.getTime(),
      });

      return await user;
    } catch (error) {
      throw error.code === 11000
        ? new RpcException('Duplicate field')
        : new RpcException('An undefined error occured');
    }
  }

  // In Progress
  public async getAllUser(): Promise<User[]> {
    try {
      const user = this.authRepository.find();
      return await user;
    } catch (error) {
      console.log(error);
    }
  }

  public async getUser(id: string): Promise<User> {
    const user = this.authRepository.findOne(id);
    return await user;
  }
}
