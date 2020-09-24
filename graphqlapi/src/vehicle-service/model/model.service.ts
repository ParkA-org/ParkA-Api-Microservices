import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { ModelType } from './types/model.type';
import { CreateModelInput } from './inputs/create-model.input';
import { GetManyModelsByIdInput } from './inputs/get-many-models-by-id.input';
import { GetModelByIdInput } from './inputs/get-model-by-id.input';

@Injectable()
export class ModelService {
  @Client({
    transport: Transport.REDIS,
    options: {
      url: `redis://redis-parka-microservices:6379`,
    },
  })
  private client: ClientProxy;

  public async getModelById(getModelByIdInput: GetModelByIdInput) {
    const response = await this.client.send<ModelType>(
      {
        type: 'get-model-by-id',
      },
      getModelByIdInput,
    );

    return response.toPromise();
  }

  public async getManyModelsById(
    getManyModelsByIdInput: GetManyModelsByIdInput,
  ): Promise<ModelType[]> {
    const response = await this.client.send<ModelType[]>(
      {
        type: 'get-many-models-by-id',
      },
      getManyModelsByIdInput,
    );

    return response.toPromise();
  }

  public async createModel(
    createModelInput: CreateModelInput,
  ): Promise<ModelType> {
    const response = await this.client.send<ModelType>(
      {
        type: 'create-model',
      },
      createModelInput,
    );

    return response.toPromise();
  }
}
