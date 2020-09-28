import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GetManyModelsByIdInput } from '../model/inputs/get-many-models-by-id.input';
import { ModelService } from '../model/model.service';
import { CreateMakeInput } from './inputs/create-make.input';
import { GetMakeByIdInput } from './inputs/get-make-by-id.inputs';
import { MakeType } from './types/make.type';
import { MakeService } from './make.service';
import { Logger } from '@nestjs/common';

@Resolver(of => MakeType)
export class MakeResolver {
  private logger = new Logger('MakeResolver');

  constructor(
    private makeService: MakeService,
    private modelService: ModelService,
  ) {}

  @Query(returns => MakeType)
  public async getMakeById(
    @Args('getMakeByIdInput')
    getMakeByIdInput: GetMakeByIdInput,
  ): Promise<MakeType> {
    this.logger.debug(
      `Received get make by id with payload ${JSON.stringify(
        getMakeByIdInput,
      )}`,
    );

    return this.makeService.getMakeById(getMakeByIdInput);
  }

  @Query(returns => [MakeType])
  public async getAllMakes(): Promise<MakeType> {
    this.logger.debug(`Received get all makes`);

    return this.makeService.getAllMakes();
  }

  @Mutation(of => MakeType)
  public async createMake(
    @Args('createMakeInput')
    createMakeInput: CreateMakeInput,
  ): Promise<MakeType> {
    this.logger.debug(
      `Received create make input ${JSON.stringify(createMakeInput)}`,
    );

    return this.makeService.createMake(createMakeInput);
  }

  @ResolveField()
  public async models(@Parent() make: MakeType) {
    this.logger.debug(
      `Received resolve field models with payload ${JSON.stringify(make)}`,
    );

    const getManyModelsByIdInput: GetManyModelsByIdInput = {
      ids: make.models,
    };

    return this.modelService.getManyModelsById(getManyModelsByIdInput);
  }
}
