import { Injectable, Logger } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { ModelType } from './types/model.type';
import { CreateModelInput } from './inputs/create-model.input';
import { GetManyModelsByIdInput } from './inputs/get-many-models-by-id.input';
import { GetModelByIdInput } from './inputs/get-model-by-id.input';
import { MakeService } from '../make/make.service';
import { UpdateMakeModelListInput } from './inputs/update-make-model-list.input';

@Injectable()
export class ModelService {
  private client: ClientProxy;
  private logger = new Logger('ModelService');

  constructor(private makeService: MakeService) {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: `${process.env.REDIS_URL}`,
      },
    });
  }

  public async getModelById(getModelByIdInput: GetModelByIdInput) {
    this.logger.debug(
      `Received get model by id with payload ${JSON.stringify(
        getModelByIdInput,
      )}`,
    );

    const response = await this.client.send<ModelType>(
      {
        type: 'get-model-by-id',
      },
      getModelByIdInput,
    );

    return response.toPromise();
  }

  public async getAllModels(): Promise<ModelType[]> {
    this.logger.debug(`Received get all models`);

    const response = await this.client.send<ModelType[]>(
      {
        type: 'get-all-models',
      },
      {},
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
    this.logger.debug(
      `Received create model with payload ${JSON.stringify(createModelInput)}`,
    );

    const response = await this.client.send<ModelType>(
      {
        type: 'create-model',
      },
      createModelInput,
    );

    //TODO: find a better solution
    const res = await response.toPromise();
    const { id, make } = res;

    const updateModelListInput: UpdateMakeModelListInput = {
      makeId: make,
      modelId: id,
    };

    this.makeService.updateMakeModelList(updateModelListInput);

    return res;
  }
}
