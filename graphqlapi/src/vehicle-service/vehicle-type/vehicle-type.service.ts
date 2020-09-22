import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { VehicleTypeType } from './vehicle-type-data/vehicle-type.type';
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
      { type: 'get-vehicle' },
      getVehicleTypeByIdInput,
    );

    return response.toPromise();
  }
}
