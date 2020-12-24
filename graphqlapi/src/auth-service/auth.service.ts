import { Injectable, Logger } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { UpdateUserInput } from './inputs/update-user.input';
import { CreateUserInput } from './inputs/create-user.input';
import { LoginUserInput } from './inputs/login-user.input';
import { LoginType } from './types/login.type';
import { UserType } from './types/user.type';
import { UpdateUserPasswordInput } from './inputs/update-user-password.input';
import { ConfirmEmailInput } from 'src/email-service/inputs/confirm-email.input';
import { ConfirmEmailType } from 'src/email-service/types/confirm-email.type';
import { JWTpayload } from './types/jwt.type';
import { InternUpdateUser } from './inputs/intern-update-user';
import { InternUpdatePassword } from './inputs/intern-update-password';
import { SocialLoginInput } from './inputs/social-login.input';
import { AddUserInformationInput } from './inputs/add-userInformation.input';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: { url: `${process.env.REDIS_URL}` },
    });
  }

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
    internUpdateUser.id = user.id;
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

  public async socialLogin(
    socialLoginInput: SocialLoginInput,
  ): Promise<LoginType> {
    this.logger.log(`Got Social Login Input data`);

    const response = this.client.send<LoginType>(
      { type: 'social-login' },
      socialLoginInput,
    );
    return response.toPromise();
  }

  public async addUserInformation(
    addUserInformationInput: AddUserInformationInput,
    user: JWTpayload,
  ): Promise<LoginType> {
    this.logger.log(`Got to add user information with this input data`);

    addUserInformationInput.id = user.id;

    const response = this.client.send<LoginType>(
      { type: 'add-userInformation-social-login' },
      addUserInformationInput,
    );
    return response.toPromise();
  }

  public async updateUserPassword(
    updateUserPasswordInput: UpdateUserPasswordInput,
    user: JWTpayload,
  ): Promise<UserType> {
    const internUpdatePassword = new InternUpdatePassword();
    internUpdatePassword.newPassword = updateUserPasswordInput.newPassword;
    internUpdatePassword.oldPassword = updateUserPasswordInput.oldPassword;
    internUpdatePassword.email = user.email;

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
