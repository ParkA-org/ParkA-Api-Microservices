import { Injectable, Logger } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import {
  CreateUserInput,
  LoginUserInput,
  UpdateUserInput,
} from './user-data/user.input';
import { UserType } from './user-data/user.type';

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

  public async updateUser(updateUserInput: UpdateUserInput): Promise<UserType> {
    this.logger.log(`Got updateUserInput data`);
    const response = this.client.send<UserType>(
      { type: 'update-user' },
      UpdateUserInput,
    );
    return response.toPromise();
  }

  public async singIn(loginUserInput: LoginUserInput): Promise<UserType> {
    this.logger.log('Got LoginUserInput data');
    const response = this.client.send<UserType>(
      { type: 'sing-in' },
      loginUserInput,
    );
    return response.toPromise();
  }
}
