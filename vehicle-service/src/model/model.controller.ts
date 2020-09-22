import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Model } from './model-data/model.entity';
import { CreateModelDto } from './model-dto/create-model.dto';
import { GetModelByIdDto } from './model-dto/get-model-by-id.dto';
import { ModelService } from './model.service';

@Controller('model')
export class ModelController {
  constructor(private modelService: ModelService) {}

  @MessagePattern({ type: 'get-model-by-id' })
  public async getModelById(getModelByIdDto: GetModelByIdDto): Promise<Model> {
    return await this.modelService.getModelById(getModelByIdDto);
  }

  @MessagePattern({ type: 'create-model' })
  public async createModel(createModelDto: CreateModelDto) {
    return this.modelService.createModel(createModelDto);
  }
}
