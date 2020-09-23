import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Model } from './model-entities/model.entity';
import { CreateModelDto } from './model-dto/create-model.dto';
import { GetModelByIdDto } from './model-dto/get-model-by-id.dto';
import { v4 as uuid } from 'uuid';
import { GetManyModelsByIdDto } from './model-dto/get-many-models-by-id.dto';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(Model) private modelRepository: Repository<Model>,
  ) {}

  public async getModelById(getModelByIdDto: GetModelByIdDto): Promise<Model> {
    return await this.modelRepository.findOne(getModelByIdDto);
  }

  public async getManyModelsById(
    getManyModelsByIdDto: GetManyModelsByIdDto,
  ): Promise<Model[]> {
    return await this.modelRepository.find({
      where: {
        id: {
          $in: getManyModelsByIdDto.ids,
        },
      },
    });
  }

  public async createModel(createModelDto: CreateModelDto): Promise<Model> {
    const { make, name } = createModelDto;

    const model = this.modelRepository.create({
      id: uuid(),
      make,
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return await this.modelRepository.save(model);
  }
}
