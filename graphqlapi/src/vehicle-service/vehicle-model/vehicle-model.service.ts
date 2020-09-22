import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { VehicleModelType } from './vehicle-model-data/vehicle-model.type';
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
    const response = this.client.send<VehicleModelType>(
      {
        type: 'get-model-by-id',
      },
      getVehicleModelByIdInput,
    );

    return await response.toPromise();
  }
}
