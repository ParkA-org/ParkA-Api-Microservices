import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm';
import { CreateFeatureDto } from './dtos/create-feature.dto';
import { Feature } from './entities/feature.entity';
import { v4 as uuid } from 'uuid';
import { RpcException } from '@nestjs/microservices/exceptions/rpc-exception';

@Injectable()
export class FeatureService {

  private logger = new Logger('FeatureService');

  constructor(
    @InjectRepository(Feature) private featureRepository: Repository<Feature>,
  ) {}

  public async createFeature(createFeatureDro: CreateFeatureDto): Promise<Feature>{  
    const {name} = createFeatureDro;
    try {
        const feature = this.featureRepository.save({
          id: uuid(),
          name,
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
  
  public async getFeature(id: string): Promise<Feature> {
    try {
        const feature = this.featureRepository.findOne({ id });
        return await feature;
      } catch (error) {
        throw new RpcException('Feature not Found');
      }
  }

  public async getFeatures(): Promise<Feature[]>{
    try {
        const features = this.featureRepository.find();
        return await features;
      } catch (error) {
        new RpcException('Features not found');
      }
  }

}
