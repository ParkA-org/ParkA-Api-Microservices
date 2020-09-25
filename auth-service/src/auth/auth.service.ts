import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Credential } from './auth-entity/credential.entity';
import { CreateUserDto } from './auth-dto/create-user.dto';
import { User } from './auth-entity/user.entity';
import { v4 as uuid } from 'uuid';
import { RpcException } from '@nestjs/microservices';
import { UpdateUserDto } from './auth-dto/update-user.dto';
import { AuthCredentialsDto } from './auth-dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { LoginType } from './auth-interface/login';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
    @InjectRepository(Credential)
    private credentialRepository: Repository<Credential>,
  ) {}

  // Bobop con el string del url
  // Is Inprogress
  public async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    this.logger.debug(
      `Received update user payload ${JSON.stringify(updateUserDto)}`,
    );
    const { id, name, email, lastName, profilePicture } = updateUserDto;
    const user = await this.getUser(id);
    try {
      const user = this.authRepository.save({
        id: uuid(),
        name: '',
        lastName: '',
        email: '',
        profilePicture: '',
        updateAt: new Date().toISOString(),
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
    var { name, email, lastName, profilePicture, password } = createUserDto;

    var date = new Date();

    try {
      const salt = await bcrypt.genSalt();
      password = await this.hashPassword(password, salt);
      const id = uuid();

      var result = this.credentialRepository.save({
        id,
        email,
        password,
        salt,
        createAt: date.toISOString(),
        updateAt: date.toISOString(),
      });

      this.logger.debug(
        `Received create user payload ${JSON.stringify(result)}`,
      );
      const id2 = id;

      const user = this.authRepository.save({
        id: uuid(),
        name,
        lastName,
        email,
        profilePicture,
        createAt: date.toISOString(),
        updateAt: date.toISOString(),
        confirmed: false,
        credential: id2,
      });

      return await user;
    } catch (error) {
      throw error.code === 11000
        ? new RpcException('Duplicate field')
        : new RpcException('An undefined error occured');
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  public async getAllUser(): Promise<User[]> {
    try {
      const user = this.authRepository.find();
      return await user;
    } catch (error) {
      console.log(error);
    }
  }

  public async getUser(id: string): Promise<User> {
    const user = this.authRepository.findOne({ id });
    return await user;
  }

  // Add JWT in passportjs
  public async signIn(
    authCredentialDto: AuthCredentialsDto,
  ): Promise<LoginType> {
    this.logger.debug(
      `Received Login user payload ${JSON.stringify(authCredentialDto)}`,
    );
    const { email, password } = authCredentialDto;
    const user = await this.authRepository.findOne({ email });
    const credential = await this.credentialRepository.findOne({ email });
    const result = new LoginType();
    if (await user) {
      const hash = await bcrypt.hash(password, credential.salt);
      if (hash === credential.password) {
        result.user = user;
        result.JWT = 'ComingSoon';
        return result;
      }
    }
    return null;
  }
}
