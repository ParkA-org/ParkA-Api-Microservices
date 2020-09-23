import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Vehicle } from './vehicle-data/vehicle.entity';
import { CreateVehicleDto } from './vehicle-dto/create-vehicle.dto';
import { GetVehicleByIdDto } from './vehicle-dto/get-vehicle-by-id.dto';
import { VehicleService } from './vehicle.service';

@Controller('vehicle')
export class VehicleController {
  constructor(private vehicleService: VehicleService) {}

  @MessagePattern({ type: 'get-vehicle-by-id' })
  public async getVehicleById(
    getVehicleByIdDto: GetVehicleByIdDto,
  ): Promise<Vehicle> {
    return await this.vehicleService.getVehicleById(getVehicleByIdDto);
  }

  @MessagePattern({ type: 'get-all-vehicles' })
  public async getAllVehicles(): Promise<Vehicle[]> {
    return await this.vehicleService.getAllVehicles();
  }

  @MessagePattern({ type: 'create-vehicle' })
  public async createVehicle(
    createVehicleDto: CreateVehicleDto,
  ): Promise<Vehicle> {
    return await this.vehicleService.createVehicle(createVehicleDto);
  }
}
