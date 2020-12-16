import { Injectable, Logger } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { JWTpayload } from 'src/auth-service/types/jwt.type';
import { UserType } from 'src/auth-service/types/user.type';
import { UserInformationType } from 'src/core-service/user-information/types/user-information.type';
import { CreateParkingInput } from './inputs/create-parking.input';
import { FilterInput } from './inputs/filter.input';
import { GetUserInformationByIdDto } from './inputs/get-user-information-by-id.dto';
import { InternCreateParking } from './inputs/intern-create-parking';
import { InternUpdateParking } from './inputs/intern-update-parking';
import { UpdateParkingInput } from './inputs/update-parking.input';
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
    updateParkingInput: UpdateParkingInput,
    user: JWTpayload,
  ): Promise<ParkingType> {
    this.logger.debug(
      `Received update parking with payload ${JSON.stringify(
        updateParkingInput,
      )}`,
    );

    const internUpdateParking = new InternUpdateParking();

    const internFieldList = Object.keys(updateParkingInput);

    for (const field of internFieldList) {
      internUpdateParking[field] = updateParkingInput[field];
    }
    internUpdateParking.userInformation = user.userInformation;

    const response = await this.client.send<ParkingType>(
      { type: 'update-parking' },
      internUpdateParking,
    );

    return response.toPromise();
  }

  public async getAllParkings(
    filterInput: FilterInput,
  ): Promise<ParkingType[]> {
    this.logger.debug(`Received get all parkings`);

    const response = await this.client.send<ParkingType[]>(
      { type: 'get-all-parkings' },
      filterInput,
    );

    return response.toPromise();
  }

  public async getAllUserParkings(getAllUserParkingsInternalInput: {
    userInformationId: string;
  }): Promise<ParkingType[]> {
    this.logger.debug(`Received get my all parkings`);

    const response = await this.client.send<ParkingType[]>(
      { type: 'get-all-my-parkings' },
      getAllUserParkingsInternalInput,
    );

    return response.toPromise();
  }

  public async getUserInformationById(
    id: string,
  ): Promise<UserInformationType> {
    this.logger.log('Got User By UserInformationId data');
    const data = new GetUserInformationByIdDto();
    data.id = id;
    const response = this.client.send<UserInformationType>(
      { type: 'get-user-information-by-id' },
      data,
    );
    return response.toPromise();
  }

  public async getUserByUserInformation(id: string): Promise<UserType> {
    this.logger.log('Got UserInformationid data');
    const response = this.client.send<UserType>(
      { type: 'get-user-by-userInformation' },
      id,
    );
    return response.toPromise();
  }

  public async reviewParking(
    parking: string,
    calification: number,
  ): Promise<ParkingType> {
    const response = this.client.send<ParkingType>(
      { type: 'review-parking' },
      { id: parking, calification },
    );
    return response.toPromise();
  }
}
