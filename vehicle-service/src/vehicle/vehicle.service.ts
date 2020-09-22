import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicle-data/vehicle.entity';
import { CreateVehicleDto } from './vehicle-dto/create-vehicle.dto';
import { v4 as uuid } from 'uuid';
import { GetVehicleByIdDto } from './vehicle-dto/get-vehicle-by-id.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>,
  ) {}

  public async getVehicleById(
    getVehicleByIdDto: GetVehicleByIdDto,
  ): Promise<Vehicle> {
    return await this.vehicleRepository.findOne(getVehicleByIdDto);
  }

  public async createVehicle(
    createVehicleDto: CreateVehicleDto,
  ): Promise<Vehicle> {
    const {
      alias,
      colorExterior,
      detail,
      licensePlate,
      mainPicture,
      model,
      pictures,
      vehicleType,
      verified,
      year,
    } = createVehicleDto;

    const vehicle = this.vehicleRepository.create({
      id: uuid(),
      alias,
      colorExterior,
      detail,
      licensePlate,
      mainPicture,
      model,
      pictures,
      vehicleType,
      verified,
      year,
    });

    return await this.vehicleRepository.save(vehicle);
  }
}