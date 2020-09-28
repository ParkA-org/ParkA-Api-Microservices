import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Model } from './entities/model.entity';
import { CreateModelDto } from './dtos/create-model.dto';
import { GetManyModelsByIdDto } from './dtos/get-many-models-by-id.dto';
import { GetModelByIdDto } from './dtos/get-model-by-id.dto';
import { ModelService } from './model.service';

@Controller('model')
export class ModelController {
  constructor(private modelService: ModelService) {}

  @MessagePattern({ type: 'get-model-by-id' })
  public async getModelById(getModelByIdDto: GetModelByIdDto): Promise<Model> {
    return await this.modelService.getModelById(getModelByIdDto);
  }

  @MessagePattern({ type: 'get-many-models-by-id' })
  public async getManyModelsById(
    getManyModelsByIdDto: GetManyModelsByIdDto,
  ): Promise<Model[]> {
    return await this.modelService.getManyModelsById(getManyModelsByIdDto);
  }

  @MessagePattern({ type: 'create-model' })
  public async createModel(createModelDto: CreateModelDto): Promise<Model> {
    return this.modelService.createModel(createModelDto);
  }
}
