import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ModelType } from './types/model.type';
import { CreateModelInput } from './inputs/create-model.input';
import { GetModelByIdInput } from './inputs/get-model-by-id.input';
import { ModelService } from './model.service';
import { Logger, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth-service/strategy/auth.guard';
import { MakeService } from '../make/make.service';
import { MakeType } from '../make/types/make.type';

@Resolver(of => ModelType)
export class ModelResolver {
  private logger = new Logger('ModelResolver');

  constructor(
    private modelService: ModelService,
    private makeService: MakeService,
  ) {}

  @Query(returns => ModelType)
  public async getModelById(
    @Args('getModelByIdInput')
    getModelByIdInput: GetModelByIdInput,
  ) {
    this.logger.debug(
      `Received get model by id with payload ${JSON.stringify(
        getModelByIdInput,
      )}`,
    );

    return await this.modelService.getModelById(getModelByIdInput);
  }

  @Query(returns => [ModelType])
  public async getAllModels(): Promise<ModelType[]> {
    this.logger.debug(`Received get  all modes`);

    return await this.modelService.getAllModels();
  }

  @UseGuards(AuthGuard)
  @Mutation(of => ModelType)
  public async createModel(
    @Args('createModelInput')
    createModelInput: CreateModelInput,
  ): Promise<ModelType> {
    this.logger.debug(
      `Received create model with payload ${JSON.stringify(createModelInput)}`,
    );

    return await this.modelService.createModel(createModelInput);
  }

  @ResolveField(returns => MakeType)
  private async make(@Parent() model: ModelType): Promise<MakeType> {
    return this.makeService.getMakeById({ id: model.make });
  }
}
