import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  @MessagePattern({ type: 'get-user' })
  public async getCatalogItems(): Promise<{}> {
    return { id: 'helloworld v:' };
  }
}
