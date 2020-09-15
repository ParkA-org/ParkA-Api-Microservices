import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { UserType } from './auth-service.type';

@Injectable()
export class AuthServiceService {
  @Client({
    transport: Transport.REDIS,
    options: { url: `redis://localhost:6379` },
  })
  client: ClientProxy;

  public async getUserById(id: string): Promise<UserType> {
    return { id: 'helloworld v:' };
  }
}
