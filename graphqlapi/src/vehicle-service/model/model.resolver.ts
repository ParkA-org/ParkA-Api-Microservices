import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ModelType } from './types/model.type';
import { CreateModelInput } from './inputs/create-model.input';
import { GetModelByIdInput } from './inputs/get-model-by-id.input';
import { ModelService } from './model.service';

@Resolver()
export class ModelResolver {
  constructor(private modelService: ModelService) {}

  @Query(returns => ModelType)
  public async getModelById(
    @Args('getModelByIdInput')
    getModelByIdInput: GetModelByIdInput,
  ) {
    return await this.modelService.getModelById(getModelByIdInput);
  }

  @Mutation(of => ModelType)
  public async createModel(
    @Args('createModelInput')
    createModelInput: CreateModelInput,
  ): Promise<ModelType> {
    return await this.modelService.createModel(createModelInput);
  }
}
