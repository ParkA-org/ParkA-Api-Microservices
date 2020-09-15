import { Injectable, Logger } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { UserType } from './auth-service.type';

@Injectable()
export class AuthServiceService {
  private logger = new Logger('AuthServiceService');
  @Client({
    transport: Transport.REDIS,
    options: { url: `redis://redis-parka-microservices:6379` },
  })
  client: ClientProxy;

  public async getUserById(id: string): Promise<{}> {
    this.logger.log(`Getting user`);
    const response = await this.client.send<{}>({ type: 'get-user' }, {});
    return response.toPromise();
  }
}
