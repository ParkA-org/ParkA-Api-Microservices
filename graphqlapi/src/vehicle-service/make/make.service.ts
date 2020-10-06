import { Injectable, Logger } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CreateMakeInput } from './inputs/create-make.input';
import { GetMakeByIdInput } from './inputs/get-make-by-id.inputs';
import { UpdateMakeModelListInput } from './inputs/update-make-model-list.input';
import { MakeType } from './types/make.type';

@Injectable()
export class MakeService {
  private client: ClientProxy;
  private logger = new Logger('MakeService');

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: `${process.env.REDIS_URL}`,
      },
    });
  }

  public async getMakeById(
    getMakeByIdInput: GetMakeByIdInput,
  ): Promise<MakeType> {
    this.logger.debug(
      `Received get make by id with payload ${JSON.stringify(
        getMakeByIdInput,
      )}`,
    );

    const response = await this.client.send<MakeType>(
      { type: 'get-make-by-id' },
      getMakeByIdInput,
    );

    return response.toPromise();
  }

  public async getAllMakes(): Promise<MakeType> {
    this.logger.debug(`Received get all makes`);

    const response = await this.client.send<MakeType>(
      {
        type: 'get-all-makes',
      },
      {},
    );

    return response.toPromise();
  }

  public async createMake(createMakeInput: CreateMakeInput): Promise<MakeType> {
    this.logger.debug(
      `Received create make input ${JSON.stringify(createMakeInput)}`,
    );

    const response = await this.client.send<MakeType>(
      {
        type: 'create-make',
      },
      createMakeInput,
    );

    return response.toPromise();
  }

  public async updateMakeModelList(
    updateMakeModelList: UpdateMakeModelListInput,
  ) {
    this.logger.debug(
      `Received update make model list with payload ${JSON.stringify(
        updateMakeModelList,
      )}`,
    );

    const response = await this.client.send<MakeType>(
      {
        type: 'update-make-model-list',
      },
      updateMakeModelList,
    );

    return response.toPromise();
  }
}
