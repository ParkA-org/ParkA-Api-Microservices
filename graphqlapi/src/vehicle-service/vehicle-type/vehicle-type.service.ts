import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { VehicleTypeType } from './vehicle-type-data/vehicle-type.type';
import { CreateVehicleTypeInput } from './vehicle-type-inputs/create-vehicle-type.input';
import { GetVehicleTypeByIdInput } from './vehicle-type-inputs/get-vehicle-type-by-id.input';

@Injectable()
export class VehicleTypeService {
  @Client({
    transport: Transport.REDIS,
    options: {
      url: `redis://redis-parka-microservices:6379`,
    },
  })
  client: ClientProxy;

  public async getVehicleTypeById(
    getVehicleTypeByIdInput: GetVehicleTypeByIdInput,
  ): Promise<VehicleTypeType> {
    const response = await this.client.send<VehicleTypeType>(
      { type: 'get-vehicle-type-by-id' },
      getVehicleTypeByIdInput,
    );

    return response.toPromise();
  }

  public async getAllVehicleTypes(): Promise<VehicleTypeType> {
    const response = await this.client.send<VehicleTypeType>(
      { type: 'get-vehicle-all-types' },
      {},
    );

    return response.toPromise();
  }

  public async createVehicleType(
    createVehicleTypeInput: CreateVehicleTypeInput,
  ): Promise<VehicleTypeType> {
    const response = await this.client.send<VehicleTypeType>(
      { type: 'create-vehicle-all-types' },
      createVehicleTypeInput,
    );

    return response.toPromise();
  }
}
