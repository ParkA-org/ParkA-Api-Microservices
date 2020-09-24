import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleType } from './vehicle-type-entities/vehicle-type.entity';
import { CreateVehicleTypeDto } from './vehicle-type-dto/create-vehicle-type.dto';
import { v4 as uuid } from 'uuid';
import { GetVehicleTypeByIdDto } from './vehicle-type-dto/get-vehicle-type-by-id.dto';

@Injectable()
export class VehicleTypeService {
  constructor(
    @InjectRepository(VehicleType)
    private vehicleTypeRepository: Repository<VehicleType>,
  ) {}

  public async getVehicleTypeById(
    getVehicleTypeByIdDto: GetVehicleTypeByIdDto,
  ): Promise<VehicleType> {
    return this.vehicleTypeRepository.findOne(getVehicleTypeByIdDto);
  }

  public async getAllVehicleTypes(): Promise<VehicleType[]> {
    return this.vehicleTypeRepository.find();
  }

  public async createVehicleType(
    createVehicleTypeDto: CreateVehicleTypeDto,
  ): Promise<VehicleType> {
    const { name } = createVehicleTypeDto;

    const vehicleType = this.vehicleTypeRepository.create({
      id: uuid(),
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return this.vehicleTypeRepository.save(vehicleType);
  }

  //TODO: create logic to update vehicle type
}
