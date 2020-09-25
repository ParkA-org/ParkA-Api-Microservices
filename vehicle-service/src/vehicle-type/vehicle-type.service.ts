import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleType } from './vehicle-type-entities/vehicle-type.entity';
import { CreateVehicleTypeDto } from './vehicle-type-dto/create-vehicle-type.dto';
import { v4 as uuid } from 'uuid';
import { GetVehicleTypeByIdDto } from './vehicle-type-dto/get-vehicle-type-by-id.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class VehicleTypeService {
  private logger = new Logger('BodyStyleService');

  constructor(
    @InjectRepository(VehicleType)
    private vehicleTypeRepository: Repository<VehicleType>,
  ) {}

  public async getVehicleTypeById(
    getVehicleTypeByIdDto: GetVehicleTypeByIdDto,
  ): Promise<VehicleType> {
    this.logger.debug(
      `Received get color by id ${JSON.stringify(getVehicleTypeByIdDto)}`,
    );
    const result = await this.vehicleTypeRepository.findOne(
      getVehicleTypeByIdDto,
    );

    if (!result) {
      throw new RpcException('Entry not found');
    }

    return result;
  }

  public async getAllVehicleTypes(): Promise<VehicleType[]> {
    this.logger.debug(`Received get all colors`);

    return this.vehicleTypeRepository.find();
  }

  public async createVehicleType(
    createVehicleTypeDto: CreateVehicleTypeDto,
  ): Promise<VehicleType> {
    this.logger.debug(
      `Received create color with payload ${JSON.stringify(
        createVehicleTypeDto,
      )}`,
    );

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
