import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './userData/create-user.dto';
import { User } from './userData/user.entity';
import { v4 as uuid } from 'uuid';

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

    const user = this.authRepository.create({
      id: uuid(),
      name,
      lastName,
      email,
      profilePicture,
    });

    // return await {
    //   id: '12345',
    //   name: 'test name 1',
    //   lastName: 'test lastName',
    //   email: 'uncorreoporahi@gmail.com',
    //   profilePicture: '',
    // };

    return await this.authRepository.save(user);
  }
}
