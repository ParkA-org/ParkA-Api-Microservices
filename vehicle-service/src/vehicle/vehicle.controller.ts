import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Vehicle } from './vehicle-data/vehicle.entity';
import { CreateVehicleDto } from './vehicle-dto/create-vehicle.dto';
import { VehicleService } from './vehicle.service';

@Controller('vehicle')
export class VehicleController {
  constructor(private vehicleService: VehicleService) {}

  @MessagePattern({ type: 'get-vehicle' })
  public async getUser(): Promise<Vehicle> {
    return await this.vehicleService.getVehicleById();
  }

  @MessagePattern({ type: 'create-vehicle' })
  public async createVehicle(
    createVehicleDto: CreateVehicleDto,
  ): Promise<Vehicle> {
    console.log(createVehicleDto);

    return await {
      id: '1234567',
      alias: '',
      colorExteriorId: '',
      detail: '',
      licensePlate: '',
      mainPicture: '',
      modelId: '',
      pictures: [],
      vehicleTypeId: '',
      verified: false,
      year: 1234,
    };
  }
}
