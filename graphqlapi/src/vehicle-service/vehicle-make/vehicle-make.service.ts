import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { GetVehicleModelByIdInput } from '../vehicle-model/vehicle-model-inputs/get-vehicle-model-by-id.input';
import { CreateVehicleMakeInput } from './vehicle-make-inputs/create-vehicle-make.input';
import { VehicleMakeType } from './vehicle-make-type/vehicle-make.type';

@Injectable()
export class VehicleMakeService {
  @Client({
    transport: Transport.REDIS,
    options: {
      url: `redis://redis-parka-microservices:6379`,
    },
  })
  private client: ClientProxy;

  public async getVehicleMakeById(
    getVehicleMakeByIdInput: GetVehicleModelByIdInput,
  ): Promise<VehicleMakeType> {
    const response = await this.client.send<VehicleMakeType>(
      { type: 'get-make-by-id' },
      getVehicleMakeByIdInput,
    );

    return response.toPromise();
  }

  public async createVehicleMake(
    createVehicleMakeInput: CreateVehicleMakeInput,
  ): Promise<VehicleMakeType> {
    const response = await this.client.send<VehicleMakeType>(
      {
        type: 'create-make',
      },
      createVehicleMakeInput,
    );

    return response.toPromise();
  }
}
