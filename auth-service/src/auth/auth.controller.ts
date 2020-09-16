import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern({ type: 'get-user' })
  public async getCatalogItems(): Promise<{}> {
    return { id: 'helloworld v:' };
  }
}
