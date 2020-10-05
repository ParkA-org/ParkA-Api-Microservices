import { Injectable, Logger } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { VehicleType } from './types/vehicle.type';
import { CreateVehicleInput } from './inputs/create-vehicle.input';
import { GetVehicleByIdInput } from './inputs/get-vehicle-by-id.input';
import { UpdateVehicleInput } from './inputs/update-vehicle.input';

@Injectable()
export class VehicleService {
  private client: ClientProxy;
  private logger = new Logger('VehicleService');

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: `${process.env.REDIS_URL}`,
      },
    });
  }

  public async getVehicleById(
    getVehicleByIdInput: GetVehicleByIdInput,
  ): Promise<VehicleType> {
    this.logger.debug(
      `Received get vehicle by id with data ${JSON.stringify(
        getVehicleByIdInput,
      )}`,
    );

    const response = await this.client.send<VehicleType>(
      { type: 'get-vehicle-by-id' },
      getVehicleByIdInput,
    );

    return response.toPromise();
  }

  public async getAllVehicles(): Promise<VehicleType[]> {
    this.logger.debug(`Received get all vehicles`);

    const response = await this.client.send<VehicleType[]>(
      { type: 'get-all-vehicles' },
      {},
    );

    return response.toPromise();
  }

  public async createVehicle(
    createVehicleInput: CreateVehicleInput,
  ): Promise<VehicleType> {
    this.logger.debug(
      `Received create vehicle with data ${JSON.stringify(createVehicleInput)}`,
    );

    const response = await this.client.send<VehicleType>(
      { type: 'create-vehicle' },
      createVehicleInput,
    );

    return response.toPromise();
  }

  public async updateVehicle(
    updateVehicleInput: UpdateVehicleInput,
  ): Promise<VehicleType> {
    this.logger.debug(
      `Received update vehicle with data ${JSON.stringify(updateVehicleInput)}`,
    );

    const response = await this.client.send<VehicleType>(
      { type: 'update-vehicle' },
      updateVehicleInput,
    );

    return response.toPromise();
  }
}
