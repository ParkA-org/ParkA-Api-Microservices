import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Credential } from './entities/credential.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuid } from 'uuid';
import { RpcException } from '@nestjs/microservices';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthCredentialsDto } from './dtos/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { LoginType } from './login-class/login';
import { exception } from 'console';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { UpdateUserPasswordDto } from './dtos/update-user-password.dto';
import { SocialLoginDto } from './dtos/social-login.dto';
import { SocialLogin } from './classes/social-login.class';
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
      const { id, name, lastName, profilePicture, origin } = updateUserDto;
      const user = await this.getUser(id);

      profilePicture !== undefined
        ? (user.profilePicture = profilePicture)
        : null;

      lastName !== undefined ? (user.lastName = lastName) : null;

      name !== undefined ? (user.name = name) : null;

      user.updatedAt = new Date().toISOString();

      user.origin = origin;

      await this.authRepository.save(user);

      return user;
    } catch (error) {
      throw new RpcException('User not Found');
    }
  }

  // public async addUserInformation(): Promise<SocialLogin> {}

  public async socialLogin(
    socialLoginDto: SocialLoginDto,
  ): Promise<SocialLogin> {
    this.logger.debug(
      `Received social login user payload ${JSON.stringify(socialLoginDto)}`,
    );

    try {
      const { displayName, email, origin, photoUrl } = socialLoginDto;
      const user = await this.getUserByEmail(email);
      const socialLogin = new SocialLogin();
      if (user == undefined) {
        const userNew = new User();
        userNew.createdAt = new Date().toISOString();
        user.name = displayName.split(' ')[0];
        user.updatedAt = new Date().toISOString();
        if (displayName.split(' ').length != 1) {
          userNew.lastName = displayName.split(' ')[1];
        } else {
          userNew.lastName = ' ';
        }
        photoUrl !== undefined ? (user.profilePicture = photoUrl) : null;
        userNew.origin = origin;
        userNew.email = email;
        userNew.id = uuid();
        await this.authRepository.save(userNew);
        socialLogin.user = userNew;
        socialLogin.register = false;
      } else {
        socialLogin.user = user;
        socialLogin.register = true;
      }
      socialLogin.JWT = await this.createToken(socialLogin.user);
      return socialLogin;
    } catch (error) {
      throw new RpcException('User already exist in parka services');
    }
  }

  public async updateUserPassword(
    updateUserPasswordDto: UpdateUserPasswordDto,
  ): Promise<User> {
    let { oldPassword, newPassword, email } = updateUserPasswordDto;
    email = email.toLowerCase();

    try {
      const credential = await this.credentialRepository.findOne({
        email: email,
      });
      const user = await this.authRepository.findOne({ email: email });

      if (await this.verifyPassword(oldPassword, credential)) {
        const credential_tmp = await this.updateCredential(
          newPassword,
          credential,
        );
        this.credentialRepository.save(credential_tmp);
      } else {
        throw new RpcException('Invalid Password');
      }

      return user;
    } catch (error) {
      throw new RpcException('Invalid Password');
    }
  }

  private async updateCredential(
    newPassword: string,
    credential: Credential,
  ): Promise<Credential> {
    const salt = await bcrypt.genSalt();
    newPassword = await this.hashPassword(newPassword, salt);
    credential.password = newPassword;
    credential.salt = salt;
    credential.updatedAt = new Date().toISOString();

    return credential;
  }

  private async verifyPassword(
    oldPassword: string,
    credential: Credential,
  ): Promise<boolean> {
    const verify = await this.hashPassword(oldPassword, credential.salt);
    if (verify === credential.password) {
      return true;
    }
    return false;
  }

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    let {
      name,
      email,
      lastName,
      profilePicture,
      password,
      origin,
      userInformation,
    } = createUserDto;

    const date = new Date();
    email = email.toLowerCase();

    try {
      const salt = await bcrypt.genSalt();
      const password_tmp = await this.hashPassword(password, salt);
      const id = uuid();

      this.credentialRepository.save({
        id,
        email,
        password: password_tmp,
        salt,
        createdAt: date.toISOString(),
        updatedAt: date.toISOString(),
      });

      const id2 = id;

      const user = this.authRepository.save({
        id: uuid(),
        name,
        lastName,
        email,
        profilePicture,
        userInformation,
        createdAt: date.toISOString(),
        updatedAt: date.toISOString(),
        confirmed: false,
        credential: id2,
        origin,
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
      new RpcException('Users not found');
    }
  }

  private createToken(user: User) {
    const { id, email, userInformation } = user;
    return jwt.sign(
      { id: id, email: email, userInformation: userInformation },
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

  public async getUserByEmail(email: string): Promise<User> {
    try {
      const user = this.authRepository.findOne({ email: email });
      return await user;
    } catch (error) {
      throw new exception('User not Found');
    }
  }

  public async getUserByUserInformation(id: string): Promise<User> {
    try {
      const user = this.authRepository.findOne({ userInformation: id });
      return await user;
    } catch (error) {
      throw new exception('User not Found');
    }
  }

  public async signIn(
    authCredentialDto: AuthCredentialsDto,
  ): Promise<LoginType> {
    try {
      let { email, password } = authCredentialDto;

      email = email.toLowerCase();
      const user = await this.authRepository.findOne({ email: email });

      const credential = await this.credentialRepository.findOne({
        email: email,
      });

      if (user) {
        const hash = await this.hashPassword(password, credential.salt);

        if (hash === credential.password) {
          const JWT = await this.createToken(user);

          const result = {
            user,
            JWT,
          };

          return result;
        }
      }
    } catch {
      throw new RpcException('Invalid Credentials');
    }
  }
}
