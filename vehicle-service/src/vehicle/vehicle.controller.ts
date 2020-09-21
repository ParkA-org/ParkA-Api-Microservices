import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { VehicleService } from './vehicle.service';

@Controller('vehicle')
export class VehicleController {
  constructor(private vehicleService: VehicleService) {}

  @MessagePattern({ type: 'get-vehicle' })
  public async getUser(): Promise<{}> {
    return await {
      id: '1234567890',
    };
  }
}
