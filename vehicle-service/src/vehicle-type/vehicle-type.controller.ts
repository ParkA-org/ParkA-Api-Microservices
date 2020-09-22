import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { GetVehicleByIdDto } from 'src/vehicle/vehicle-dto/get-vehicle-by-id.dto';
import { CreateVehicleTypeDto } from './vehicle-type-dto/create-vehicle-type.dto';
import { VehicleTypeService } from './vehicle-type.service';

@Controller('vehicle-type')
export class VehicleTypeController {
  constructor(private vehicleTypeService: VehicleTypeService) {}

  @MessagePattern({ type: 'get-vehicle-type-by-id' })
  public async getVehicleTypeById(getVehicleTypeByIdDto: GetVehicleByIdDto) {
    return await this.vehicleTypeService.getVehicleTypeById(
      getVehicleTypeByIdDto,
    );
  }

  @MessagePattern({ type: 'get-vehicle-all-types' })
  public async getAllVehicleTypes() {
    return await this.vehicleTypeService.getAllVehicleTypes();
  }

  @MessagePattern({ type: 'create-vehicle-all-types' })
  public async createVehicleType(createVehicleTypeDto: CreateVehicleTypeDto) {
    return await this.vehicleTypeService.createVehicleType(
      createVehicleTypeDto,
    );
  }

  //TODO: create logic to update vehicle type
}
