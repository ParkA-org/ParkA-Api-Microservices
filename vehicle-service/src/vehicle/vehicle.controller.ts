import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Vehicle } from './vehicle-data/vehicle.entity';
import { CreateVehicleDto } from './vehicle-dto/create-vehicle.dto';
import { GetVehicleByIdDto } from './vehicle-dto/get-vehicle-by-id.dto';
import { VehicleService } from './vehicle.service';

@Controller('vehicle')
export class VehicleController {
  constructor(private vehicleService: VehicleService) {}

  //TODO: Change message pattern
  @MessagePattern({ type: 'get-vehicle' })
  public async getVehicleById(
    getVehicleByIdDto: GetVehicleByIdDto,
  ): Promise<Vehicle> {
    return await this.vehicleService.getVehicleById(getVehicleByIdDto);
  }

  @MessagePattern({ type: 'create-vehicle' })
  public async createVehicle(
    createVehicleDto: CreateVehicleDto,
  ): Promise<Vehicle> {
    return await this.vehicleService.createVehicle(createVehicleDto);
  }

  // TODO: Create logic to get all vehicles
}
