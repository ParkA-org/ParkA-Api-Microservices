import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Credential } from './entities/credential.entity';
import { CreateUserDto } from './auth-dto/create-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuid } from 'uuid';
import { RpcException } from '@nestjs/microservices';
import { UpdateUserDto } from './auth-dto/update-user.dto';
import { AuthCredentialsDto } from './auth-dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { LoginType } from './login-class/login';
import { exception } from 'console';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
    @InjectRepository(Credential)
    private credentialRepository: Repository<Credential>,
    private configService: ConfigService,
  ) {}

  public async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    this.logger.debug(
      `Received update user payload ${JSON.stringify(updateUserDto)}`,
    );

    try {
      const { id, name, password, lastName, profilePicture } = updateUserDto;
      const user = await this.getUser(id);

      profilePicture !== undefined
        ? (user.profilePicture = profilePicture)
        : null;

      password !== undefined
        ? await this.updateCredential(user.credential, password)
        : null;

      lastName !== undefined ? (user.lastName = lastName) : null;

      name !== undefined ? (user.name = name) : null;

      user.updatedAt = new Date().toISOString();

      await this.authRepository.save(user);

      return user;
    } catch (error) {
      throw new RpcException('User not Found');
    }
  }

  public async updateCredential(id: string, password: string) {
    this.logger.debug(
      `Received update credential ""  payload ${JSON.stringify(id)}`,
    );
    const credential = await this.credentialRepository.findOne({ id });
    const salt = await bcrypt.genSalt();
    password = await this.hashPassword(password, salt);
    credential.password = password;
    credential.salt = salt;
    credential.updatedAt = new Date().toISOString();
    this.credentialRepository.save(credential);
  }

  // Is Inprogress
  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    this.logger.debug(
      `Received create user payload ${JSON.stringify(createUserDto)}`,
    );
    const { name, email, lastName, profilePicture, password } = createUserDto;

    const date = new Date();
    email.toLowerCase();

    try {
      const salt = await bcrypt.genSalt();
      const password_tmp = await this.hashPassword(password, salt);
      const id = uuid();

      const result = this.credentialRepository.save({
        id,
        email,
        password: password_tmp,
        salt,
        createdAt: date.toISOString(),
        updatedAt: date.toISOString(),
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
        createdAt: date.toISOString(),
        updatedAt: date.toISOString(),
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

  private createToken(email: string, id: string) {
    return jwt.sign(
      { email: email, id: id },
      this.configService.get('JWT_SECRET'),
      {
        expiresIn: '100d',
      },
    );
  }

  public async getUser(id: string): Promise<User> {
    try {
      const user = this.authRepository.findOne({ id });
      return await user;
    } catch (error) {
      throw new exception('User not Found');
    }
  }

  public async signIn(
    authCredentialDto: AuthCredentialsDto,
  ): Promise<LoginType> {
    this.logger.debug(
      `Received Login user payload ${JSON.stringify(authCredentialDto)}`,
    );

    try {
      const { email, password } = authCredentialDto;

      email.toLowerCase();
      const user = await this.authRepository.findOne({ email });

      const credential = await this.credentialRepository.findOne({ email });

      const result = new LoginType();

      if (await user) {
        const hash = await this.hashPassword(password, credential.salt);
        if (hash === credential.password) {
          result.user = user;
          result.JWT = await this.createToken(user.id, user.email);
          return result;
        }
      }
    } catch {
      throw new exception('Invalid Credentials');
    }
  }
}
