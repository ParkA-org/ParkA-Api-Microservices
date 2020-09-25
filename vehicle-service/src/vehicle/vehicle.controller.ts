import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { GetVehicleByIdDto } from './dto/get-vehicle-by-id.dto';
import { VehicleService } from './vehicle.service';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

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

  @MessagePattern({ type: 'update-vehicle' })
  public async updateVehicle(
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    return await this.vehicleService.updateVehicle(updateVehicleDto);
  }
}
