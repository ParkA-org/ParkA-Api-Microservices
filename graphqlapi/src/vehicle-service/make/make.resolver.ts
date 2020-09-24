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

@Resolver(of => MakeType)
export class MakeResolver {
  constructor(
    private makeService: MakeService,
    private modelService: ModelService,
  ) {}

  @Query(returns => MakeType)
  public async getMakeById(
    @Args('getMakeByIdInput')
    getMakeByIdInput: GetMakeByIdInput,
  ): Promise<MakeType> {
    return this.makeService.getMakeById(getMakeByIdInput);
  }

  @Query(returns => MakeType)
  public async getAllMakes(): Promise<MakeType> {
    return this.makeService.getAllMakes();
  }

  @Mutation(of => MakeType)
  public async createMake(
    @Args('createMakeInput')
    createMakeInput: CreateMakeInput,
  ): Promise<MakeType> {
    return this.makeService.createMake(createMakeInput);
  }

  @ResolveField()
  public async models(@Parent() make: MakeType) {
    const getManyModelsByIdInput: GetManyModelsByIdInput = {
      ids: make.models,
    };

    return this.modelService.getManyModelsById(getManyModelsByIdInput);
  }
}
