import { Injectable, Logger } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CreateUserInformationInpuType } from './inputs/create-user-information.input';
import { GetUserInformationByIdInput } from './inputs/get-user-information-by-id.input';
import { UpdateUserInformationInternalInput } from './inputs/update-user-information-internal-input';
import { UpdateUserInformationInput } from './inputs/update-user-information.input';
import { UserInformationType } from './types/user-information.type';

@Injectable()
export class UserInformationService {
  private logger = new Logger();
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: `${process.env.REDIS_URL}`,
      },
    });
  }

  public async getUserInformationById(
    getUserInformationByIdInput: GetUserInformationByIdInput,
  ): Promise<UserInformationType> {
    const response = await this.client.send<UserInformationType>(
      { type: 'get-user-information-by-id' },
      getUserInformationByIdInput,
    );

    return response.toPromise();
  }

  public async createUserInformation(
    createUserInformationInpuType: CreateUserInformationInpuType,
  ): Promise<UserInformationType> {
    const response = await this.client.send<UserInformationType>(
      { type: 'create-user-information' },
      createUserInformationInpuType,
    );

    return response.toPromise();
  }

  public async updateUserInformation(
    updateUserInformationInternalInput: UpdateUserInformationInternalInput,
  ): Promise<UserInformationType> {
    const response = await this.client.send<UserInformationType>(
      { type: 'update-user-information' },
      updateUserInformationInternalInput,
    );

    return response.toPromise();
  }
}
