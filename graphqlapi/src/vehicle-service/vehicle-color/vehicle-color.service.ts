import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { CreateVehicleColorInput } from './vehicle-color-inputs/create-vehicle-color.input';
import { GetVehicleColorByIdInput } from './vehicle-color-inputs/get-vehicle-color-by-id.input';
import { VehicleColorType } from './vehicle-color-type/vehicle-color.type';

@Injectable()
export class VehicleColorService {
  @Client({
    transport: Transport.REDIS,
    options: {
      url: `redis://redis-parka-microservices:6379`,
    },
  })
  private client: ClientProxy;

  public async getVehicleColorById(
    getVehicleColorByIdInput: GetVehicleColorByIdInput,
  ): Promise<VehicleColorType> {
    const response = this.client.send<VehicleColorType>(
      {
        type: 'get-color-by-id',
      },
      getVehicleColorByIdInput,
    );

    return await response.toPromise();
  }

  public async getAllVehicleColors(): Promise<VehicleColorType[]> {
    const response = this.client.send<VehicleColorType[]>(
      {
        type: 'get-all-colors',
      },
      {},
    );

    return await response.toPromise();
  }

  public async createVehicleColor(
    createVehicleColorInput: CreateVehicleColorInput,
  ): Promise<VehicleColorType> {
    const response = this.client.send<VehicleColorType>(
      {
        type: 'create-color',
      },
      createVehicleColorInput,
    );

    return await response.toPromise();
  }
}