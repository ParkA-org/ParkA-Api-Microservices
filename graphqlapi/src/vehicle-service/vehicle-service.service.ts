import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { VehicleType } from './vehicle-data/vehicle.type';

@Injectable()
export class VehicleServiceService {
  @Client({
    transport: Transport.REDIS,
    options: {
      url: `redis://redis-parka-microservices:6379`,
    },
  })
  client: ClientProxy;

  public async getVehicle(): Promise<VehicleType> {
    const response = await this.client.send<VehicleType>(
      { type: 'get-vehicle' },
      {},
    );

    return response.toPromise();
  }
}
