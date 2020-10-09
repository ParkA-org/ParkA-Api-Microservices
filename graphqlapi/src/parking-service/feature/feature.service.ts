import { Injectable, Logger } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CreateFeatureInput } from './inputs/create-feature.input';
import { FeatureType } from './types/feature.type';

@Injectable()
export class FeatureService {
  private logger = new Logger('FeatureService');
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: { url: `${process.env.REDIS_URL}` },
    });
  }

  public async createFeature(
    createFeatureInput: CreateFeatureInput,
  ): Promise<FeatureType> {
    this.logger.debug(
      `Received create feature with payload ${JSON.stringify(
        createFeatureInput,
      )}`,
    );

    const response = await this.client.send<FeatureType>(
      { type: 'create-feature' },
      createFeatureInput,
    );

    return response.toPromise();
  }

  public async getAllFeatures(): Promise<FeatureType[]> {
    this.logger.debug('get all features');
    const response = await this.client.send<FeatureType[]>(
      { type: 'get-all-features' },
      {},
    );
    return response.toPromise();
  }

  public async getFeatureById(id: string): Promise<FeatureType> {
    this.logger.debug(`Received id feature with payload ${JSON.stringify(id)}`);

    const response = await this.client.send<FeatureType>(
      { type: 'get-feature-by-id' },
      id,
    );

    return response.toPromise();
  }

  public async getFeaturesByIds(ids: string[]): Promise<FeatureType[]> {
    this.logger.debug(
      `Received ids features with payload ${JSON.stringify(ids)}`,
    );

    const response = await this.client.send<FeatureType[]>(
      { type: 'get-features-by-ids' },
      ids,
    );
    return response.toPromise();
  }
}
