import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { VehicleType } from './vehicle-data/vehicle.type';
import { CreateVehicleInput } from './vehicle-inputs/create-vehicle.input';
import { GetVehicleByIdInput } from './vehicle-inputs/get-vehicle-by-id.input';

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
      { type: 'get-vehicle' },
      getVehicleByIdInput,
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
}
