import { Injectable, Logger } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { JWTpayload } from 'src/auth-service/types/jwt.type';
import { CreateParkingInput } from './inputs/create-parking.input';
import { InternCreateParking } from './inputs/intern-create-parking';
import { ParkingType } from './types/parking.type';

@Injectable()
export class ParkingService {
  private logger = new Logger('ParkingService');
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: { url: `${process.env.REDIS_URL}` },
    });
  }

  public async getParkingById(id: string): Promise<ParkingType> {
    this.logger.debug(
      `Received get user information by id with payload ${JSON.stringify(id)}`,
    );

    const response = await this.client.send<ParkingType>(
      { type: 'get-parking-by-id' },
      id,
    );

    return response.toPromise();
  }

  public async createParking(
    createParkingInput: CreateParkingInput,
    user: JWTpayload,
  ): Promise<ParkingType> {
    this.logger.debug(
      `Received create parking with payload ${JSON.stringify(
        createParkingInput,
      )}`,
    );
    const internCreateParking = new InternCreateParking();

    const internFieldList = Object.keys(createParkingInput);

    for (const field of internFieldList) {
      internCreateParking[field] = createParkingInput[field];
    }
    internCreateParking.userInformation = user.userInformation;

    const response = await this.client.send<ParkingType>(
      { type: 'create-parking' },
      internCreateParking,
    );

    return response.toPromise();
  }

  public async updateParking(
    createParkingInput: CreateParkingInput,
    user: JWTpayload,
  ): Promise<ParkingType> {
    this.logger.debug(
      `Received create parking with payload ${JSON.stringify(
        createParkingInput,
      )}`,
    );
    const internCreateParking = new InternCreateParking();

    const internFieldList = Object.keys(createParkingInput);

    for (const field of internFieldList) {
      internCreateParking[field] = createParkingInput[field];
    }
    internCreateParking.userInformation = user.userInformation;

    const response = await this.client.send<ParkingType>(
      { type: 'update-parking' },
      internCreateParking,
    );

    return response.toPromise();
  }
}
