import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { VehicleType } from './types/vehicle.type';
import { CreateVehicleInput } from './inputs/create-vehicle.input';
import { GetVehicleByIdInput } from './inputs/get-vehicle-by-id.input';
import { UpdateVehicleInput } from './inputs/update-vehicle.input';

@Injectable()
export class VehicleServiceService {
  @Client({
    transport: Transport.REDIS,
    options: {
      url: `redis://redis-parka-microservices:6379`,
    },
  })
  client: ClientProxy;

  public async getVehicle(
    getVehicleByIdInput: GetVehicleByIdInput,
  ): Promise<VehicleType> {
    const response = await this.client.send<VehicleType>(
      { type: 'get-vehicle-by-id' },
      getVehicleByIdInput,
    );

    return response.toPromise();
  }

  public async getAllVehicles(): Promise<VehicleType[]> {
    const response = await this.client.send<VehicleType[]>(
      { type: 'get-all-vehicles' },
      {},
    );

    return response.toPromise();
  }

  public async createVehicle(
    createVehicleInput: CreateVehicleInput,
  ): Promise<VehicleType> {
    const response = await this.client.send<VehicleType>(
      { type: 'create-vehicle' },
      createVehicleInput,
    );

    return response.toPromise();
  }

  public async updateVehicle(
    updateVehicleInput: UpdateVehicleInput,
  ): Promise<VehicleType> {
    const response = await this.client.send<VehicleType>(
      { type: 'update-vehicle' },
      updateVehicleInput,
    );

    return response.toPromise();
  }
}
