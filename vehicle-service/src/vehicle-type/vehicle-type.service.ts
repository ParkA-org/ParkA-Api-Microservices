import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleType } from './vehicle-type-data/vehicle-type.entity';

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

  //TODO: define createVehicleType Dto
  public async createVehicleType(): Promise<VehicleType> {
    const {} = {};

    return this.vehicleTypeRepository.save({});
  }
}
