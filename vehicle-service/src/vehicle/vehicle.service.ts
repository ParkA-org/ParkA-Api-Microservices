import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { v4 as uuid } from 'uuid';
import { GetVehicleByIdDto } from './dto/get-vehicle-by-id.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { RpcException } from '@nestjs/microservices';
import { GetAllUserVehiclesDto } from './dto/get-all-user-vehicle.dto';

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

    const result = await this.vehicleRepository.findOne(getVehicleByIdDto);

    if (!result) {
      throw new RpcException('Entry not found');
    }

    return result;
  }

  public async getAllUserVehicles(
    getAllUserVehiclesDto: GetAllUserVehiclesDto,
  ): Promise<Vehicle[]> {
    this.logger.debug(`Received get all vehicles`);

    const { userInformationId } = getAllUserVehiclesDto;

    return this.vehicleRepository.find({ userInformation: userInformationId });
  }

  public async createVehicle(
    createVehicleDto: CreateVehicleDto,
  ): Promise<Vehicle> {
    this.logger.debug(
      `Received create vehicle with payload ${JSON.stringify(
        createVehicleDto,
      )}`,
    );

    const { createVehiclePayload, userInformationIdPayload } = createVehicleDto;

    const { userInformationId } = userInformationIdPayload;

    const {
      alias,
      colorExterior,
      detail,
      licensePlate,
      mainPicture,
      model,
      pictures,
      bodyStyle,
      year,
    } = createVehiclePayload;

    const vehicle = this.vehicleRepository.create({
      id: uuid(),
      userInformation: userInformationId,
      alias,
      colorExterior,
      detail,
      licensePlate,
      mainPicture,
      model,
      pictures,
      bodyStyle,
      verified: false,
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

    const {
      getVehicleByIdPayload,
      updateVehiclePayload,
      userInformationIdPayload,
    } = updateVehicleDto;

    const { id } = getVehicleByIdPayload;
    const { userInformationId } = userInformationIdPayload;

    const vehicle = await this.vehicleRepository.findOne({
      userInformation: userInformationId,
      id: id,
    });

    if (!vehicle) {
      throw new RpcException('Entry not found');
    }

    const updateFieldList = Object.keys(updateVehiclePayload);

    for (const field of updateFieldList) {
      vehicle[field] = updateVehiclePayload[field];
    }

    vehicle.updatedAt = new Date().toISOString();

    return await this.vehicleRepository.save(vehicle);
  }
}
