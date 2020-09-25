import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicle-entities/vehicle.entity';
import { CreateVehicleDto } from './vehicle-dto/create-vehicle.dto';
import { v4 as uuid } from 'uuid';
import { GetVehicleByIdDto } from './vehicle-dto/get-vehicle-by-id.dto';
import { UpdateVehicleDto } from './vehicle-dto/update-vehicle.dto';

@Injectable()
export class VehicleService {
  private logger = new Logger('VehicleService');

  constructor(
    @InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>,
  ) {}

  public async getVehicleById(
    getVehicleByIdDto: GetVehicleByIdDto,
  ): Promise<Vehicle> {
    this.logger.debug(
      `Received get vehicle by id with payload ${JSON.stringify(
        getVehicleByIdDto,
      )}`,
    );

    return await this.vehicleRepository.findOne(getVehicleByIdDto);
  }

  public async getAllVehicles(): Promise<Vehicle[]> {
    this.logger.debug(`Received get all vehicles by id with payload `);
    return this.vehicleRepository.find();
  }

  public async createVehicle(
    createVehicleDto: CreateVehicleDto,
  ): Promise<Vehicle> {
    this.logger.debug(
      `Received create vehicle with payload ${JSON.stringify(
        createVehicleDto,
      )}`,
    );

    const {
      alias,
      colorExterior,
      detail,
      licensePlate,
      mainPicture,
      model,
      pictures,
      bodyStyle,
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
      bodyStyle,
      verified,
      year,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return await this.vehicleRepository.save(vehicle);
  }

  // TODO: Implement update logic
  public async updateVehicle(
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    this.logger.debug(
      `Received update vehicle with payload ${JSON.stringify(
        updateVehicleDto,
      )}`,
    );

    const { id } = updateVehicleDto;

    const vehicle = await this.getVehicleById({ id });

    const updateFieldList = Object.keys(updateVehicleDto);

    for (const field of updateFieldList) {
      if (vehicle.id != updateVehicleDto[field]) {
        vehicle[field] = updateVehicleDto[field];
      }
    }

    vehicle.updatedAt = new Date().toISOString();

    return await this.vehicleRepository.save(vehicle);
  }
}
