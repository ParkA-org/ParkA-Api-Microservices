import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm';
import { CreateFeatureDto } from './dtos/create-feature.dto';
import { Feature } from './entities/feature.entity';
import { v4 as uuid } from 'uuid';
import { RpcException } from '@nestjs/microservices/exceptions/rpc-exception';
import slugify from 'slugify';

@Injectable()
export class FeatureService {
  private logger = new Logger('FeatureService');

  constructor(
    @InjectRepository(Feature) private featureRepository: Repository<Feature>,
  ) {}

  public async createFeature(
    createFeatureDro: CreateFeatureDto,
  ): Promise<Feature> {
    this.logger.debug(
      `Received create feature with payload ${JSON.stringify(
        createFeatureDro,
      )}`,
    );

    const { name } = createFeatureDro;

    const searchFeature = this.featureRepository.findOne({ name: name });

    if (searchFeature) {
      throw new RpcException('Duplicate field');
    }

    try {
      const feature = this.featureRepository.save({
        id: uuid(),
        name,
        slug: slugify(name, { lower: true }),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      return await feature;
    } catch (error) {
      throw error.code === 11000
        ? new RpcException('Duplicate field')
        : new RpcException('An undefined error occured');
    }
  }

  public async getFeatureById(id: string): Promise<Feature> {
    this.logger.debug(`Received get feature by ID`);
    try {
      const feature = this.featureRepository.findOne({ id: id });
      return await feature;
    } catch (error) {
      throw new RpcException('Feature not Found');
    }
  }

  public async getAllFeatures(): Promise<Feature[]> {
    this.logger.debug(`Received get all features`);
    try {
      const features = this.featureRepository.find();
      return await features;
    } catch (error) {
      new RpcException('Features not found');
    }
  }

  public async getFeaturesByIds(ids: string[]): Promise<Feature[]> {
    this.logger.debug(`Received get features by IDs`);
    try {
      const features = this.featureRepository.find({
        where: {
          id: { $in: ids },
        },
      });

      return features;
    } catch (error) {
      throw new RpcException('Features not Found');
    }
  }
}
