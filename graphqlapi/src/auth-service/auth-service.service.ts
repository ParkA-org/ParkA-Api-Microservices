import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { UpdateUserInput } from './inputs/update-user.input';
import { CreateUserInput } from './inputs/user.input';
import { LoginUserInput } from './inputs/login-user.input';
import { LoginType } from './types/login.type';
import { UserType } from './types/user.type';
import { UpdateUserPasswordInput } from './inputs/update-user-password.input';
import { ConfirmEmailInput } from 'src/email-service/inputs/confirm-email.input';
import { ConfirmEmailType } from 'src/email-service/types/confirm-email.type';
import { JWTpayload } from './types/jwt.type';
import { InternUpdateUser } from './inputs/intern-update-user';
import { InternUpdatePassword } from './inputs/intern-update-password';

@Injectable()
export class AuthServiceService {
  private logger = new Logger('AuthServiceService');

  @Client({
    transport: Transport.REDIS,
    options: { url: `redis://redis-parka-microservices:6379` },
  })
  client: ClientProxy;

  public async getUserById(id: string): Promise<UserType> {
    this.logger.log(`Getting user`);
    const response = await this.client.send<UserType>({ type: 'get-user' }, id);
    return response.toPromise();
  }

  public async createUser(createUserInput: CreateUserInput): Promise<UserType> {
    this.logger.log(`Got createUserInput data`);
    const response = this.client.send<UserType>(
      { type: 'create-user' },
      createUserInput,
    );
    return response.toPromise();
  }

  public async getAllUsers(): Promise<UserType[]> {
    this.logger.log('Getting users');
    const response = await this.client.send<UserType[]>(
      { type: 'get-users' },
      {},
    );
    return response.toPromise();
  }

  public async confirmUser(
    confirmEmailInput: ConfirmEmailInput,
  ): Promise<ConfirmEmailType> {
    this.logger.log('Create new confirm email');
    const response = await this.client.send<ConfirmEmailType>(
      { type: 'confirm-email' },
      confirmEmailInput,
    );
    return response.toPromise();
  }

  public async updateUser(
    updateUserInput: UpdateUserInput,
    user: JWTpayload,
  ): Promise<UserType> {
    this.logger.log(
      `Got updateUserInput data ${JSON.stringify(updateUserInput)}`,
    );

    const internUpdateUser = new InternUpdateUser();
    internUpdateUser.id = user.email;
    internUpdateUser.lastName = updateUserInput.lastName;
    internUpdateUser.origin = updateUserInput.origin;
    internUpdateUser.profilePicture = updateUserInput.profilePicture;
    internUpdateUser.name = updateUserInput.name;

    const response = this.client.send<UserType>(
      { type: 'update-user' },
      internUpdateUser,
    );
    return response.toPromise();
  }

  public async updateUserPassword(
    updateUserPasswordInput: UpdateUserPasswordInput,
    user: JWTpayload,
  ): Promise<UserType> {
    this.logger.log(
      `Got updateUserPasswordInput data ${JSON.stringify(
        updateUserPasswordInput,
      )}`,
    );
    console.log(user);
    const internUpdatePassword = new InternUpdatePassword();
    internUpdatePassword.newPassword = updateUserPasswordInput.newPassword;
    internUpdatePassword.oldPassword = updateUserPasswordInput.oldPassword;
    internUpdatePassword.email = user.id;

    const response = this.client.send<UserType>(
      { type: 'update-user-password' },
      internUpdatePassword,
    );

    return response.toPromise();
  }
  public async login(loginUserInput: LoginUserInput): Promise<LoginType> {
    this.logger.log('Got LoginUserInput data');
    const response = this.client.send<LoginType>(
      { type: 'sign-in' },
      loginUserInput,
    );
    return response.toPromise();
  }
}
