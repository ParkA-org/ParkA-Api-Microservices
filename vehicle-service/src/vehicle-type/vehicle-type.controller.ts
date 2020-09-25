import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { GetVehicleByIdDto } from 'src/vehicle/dto/get-vehicle-by-id.dto';
import { CreateVehicleTypeDto } from './dtos/create-vehicle-type.dto';
import { VehicleType } from './entities/vehicle-type.entity';
import { VehicleTypeService } from './vehicle-type.service';

@Controller('vehicle-type')
export class VehicleTypeController {
  constructor(private vehicleTypeService: VehicleTypeService) {}

  @MessagePattern({ type: 'get-vehicle-type-by-id' })
  public async getVehicleTypeById(
    getVehicleTypeByIdDto: GetVehicleByIdDto,
  ): Promise<VehicleType> {
    return await this.vehicleTypeService.getVehicleTypeById(
      getVehicleTypeByIdDto,
    );
  }

  @MessagePattern({ type: 'get-vehicle-all-types' })
  public async getAllVehicleTypes(): Promise<VehicleType[]> {
    return await this.vehicleTypeService.getAllVehicleTypes();
  }

  @MessagePattern({ type: 'create-vehicle-all-types' })
  public async createVehicleType(
    createVehicleTypeDto: CreateVehicleTypeDto,
  ): Promise<VehicleType> {
    return await this.vehicleTypeService.createVehicleType(
      createVehicleTypeDto,
    );
  }
}
