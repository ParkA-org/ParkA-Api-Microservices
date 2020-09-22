import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Model } from './model-data/model.entity';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(Model) private modelRepository: Repository<Model>,
  ) {}

  public async getModelById(): Promise<Model> {
    return await this.modelRepository.findOne({});
  }
}
