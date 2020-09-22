import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { VehicleModelType } from './vehicle-model-data/vehicle-model.type';
import { CreateVehicleModelInput } from './vehicle-model-inputs/create-vehicle-model.input';
import { GetVehicleModelByIdInput } from './vehicle-model-inputs/get-vehicle-model-by-id.input';

@Injectable()
export class VehicleModelService {
  @Client({
    transport: Transport.REDIS,
    options: {
      url: `redis://redis-parka-microservices:6379`,
    },
  })
  client: ClientProxy;

  public async getVehicleModelById(
    getVehicleModelByIdInput: GetVehicleModelByIdInput,
  ) {
    const response = await this.client.send<VehicleModelType>(
      {
        type: 'get-model-by-id',
      },
      getVehicleModelByIdInput,
    );

    return response.toPromise();
  }

  public async createVehicleModel(
    createVehicleModelInput: CreateVehicleModelInput,
  ): Promise<VehicleModelType> {
    const response = await this.client.send<VehicleModelType>(
      {
        type: 'create-model',
      },
      createVehicleModelInput,
    );

    return response.toPromise();
  }
}
