import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { GetUserInformationByIdInput } from './inputs/get-user-information-by-id.input';
import { UserInformationType } from './types/user-information.type';

@Injectable()
export class UserInformationService {
  @Client({
    transport: Transport.REDIS,
    options: {
      url: `redis://redis-parka-microservices:6379`,
    },
  })
  private client: ClientProxy;

  public async getUserInformationById(
    getUserInformationByIdInput: GetUserInformationByIdInput,
  ): Promise<UserInformationType> {
    const response = await this.client.send<UserInformationType>(
      { type: 'get-user-information-by-id' },
      getUserInformationByIdInput,
    );

    return response.toPromise();
  }
}
