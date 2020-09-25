import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Model } from './model-entities/model.entity';
import { CreateModelDto } from './model-dto/create-model.dto';
import { GetModelByIdDto } from './model-dto/get-model-by-id.dto';
import { v4 as uuid } from 'uuid';
import { GetManyModelsByIdDto } from './model-dto/get-many-models-by-id.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ModelService {
  private logger = new Logger('ModelService');

  constructor(
    @InjectRepository(Model) private modelRepository: Repository<Model>,
  ) {}

  public async getModelById(getModelByIdDto: GetModelByIdDto): Promise<Model> {
    this.logger.debug(
      `Received get Model by id with payload ${JSON.stringify(
        getModelByIdDto,
      )}`,
    );

    const result = await this.modelRepository.findOne(getModelByIdDto);

    if (!result) {
      throw new RpcException('Entry not found');
    }

    return result;
  }

  public async getManyModelsById(
    getManyModelsByIdDto: GetManyModelsByIdDto,
  ): Promise<Model[]> {
    this.logger.debug(
      `Received get many Models by ids with payload ${JSON.stringify(
        getManyModelsByIdDto,
      )}`,
    );

    return this.modelRepository.find({
      where: {
        id: {
          $in: getManyModelsByIdDto.ids,
        },
      },
    });
  }

  public async createModel(createModelDto: CreateModelDto): Promise<Model> {
    this.logger.debug(
      `Received create Model with payload ${JSON.stringify(createModelDto)}`,
    );

    const { make, name } = createModelDto;

    const model = this.modelRepository.create({
      id: uuid(),
      make,
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return this.modelRepository.save(model);
  }
}
