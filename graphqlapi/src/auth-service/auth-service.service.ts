import { Injectable, Logger } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { UpdateUserInput } from './user-input/update-user.input';
import { CreateUserInput, LoginUserInput } from './user-input/user.input';
import { LoginType } from './user-type/login.type';
import { UserType } from './user-type/user.type';

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
    console.log(response);
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

  public async confirmUser(email: string): Promise<boolean> {
    this.logger.log('Create new confirm email');
    const response = await this.client.send<boolean>(
      { type: 'confirm-email' },
      email,
    );
    return response.toPromise();
  }

  public async updateUser(updateUserInput: UpdateUserInput): Promise<UserType> {
    this.logger.log(
      `Got updateUserInput data ${JSON.stringify(updateUserInput)}`,
    );
    const response = this.client.send<UserType>(
      { type: 'update-user' },
      updateUserInput,
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
