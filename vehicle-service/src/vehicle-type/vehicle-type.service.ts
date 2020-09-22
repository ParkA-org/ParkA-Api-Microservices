import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleType } from './vehicle-type-data/vehicle-type.entity';
import { CreateVehicleTypeDto } from './vehicle-type-dto/create-vehicle-type.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class VehicleTypeService {
  constructor(
    @InjectRepository(VehicleType)
    private vehicleTypeRepository: Repository<VehicleType>,
  ) {}

  //TODO: Define dto input type
  public async getVehicleTypeById(): Promise<VehicleType> {
    return this.vehicleTypeRepository.findOne();
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
    });

    return this.vehicleTypeRepository.save(vehicleType);
  }
}
