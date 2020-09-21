import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('vehicle')
export class VehicleController {
  @MessagePattern({ type: 'get-vehicle' })
  public async getUser(): Promise<{}> {
    return await {
      id: '1234567890',
    };
  }
}
