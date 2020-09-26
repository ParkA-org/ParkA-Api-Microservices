import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { CreateMakeInput } from './inputs/create-make.input';
import { GetMakeByIdInput } from './inputs/get-make-by-id.inputs';
import { UpdateMakeModelListInput } from './inputs/update-make-model-list.input';
import { MakeType } from './types/make.type';

@Injectable()
export class MakeService {
  @Client({
    transport: Transport.REDIS,
    options: {
      url: `redis://redis-parka-microservices:6379`,
    },
  })
  private client: ClientProxy;

  public async getMakeById(
    getMakeByIdInput: GetMakeByIdInput,
  ): Promise<MakeType> {
    const response = await this.client.send<MakeType>(
      { type: 'get-make-by-id' },
      getMakeByIdInput,
    );

    return response.toPromise();
  }

  public async getAllMakes(): Promise<MakeType> {
    const response = await this.client.send<MakeType>(
      {
        type: 'get-all-makes',
      },
      {},
    );

    return response.toPromise();
  }

  public async createMake(createMakeInput: CreateMakeInput): Promise<MakeType> {
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
    const response = await this.client.send<MakeType>(
      {
        type: 'update-make-model-list',
      },
      updateMakeModelList,
    );

    return response.toPromise();
  }
}
