import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GetManyVehiclesByIdInput } from '../vehicle-model/vehicle-model-inputs/get-many-vehicles-by-id.input';
import { VehicleModelService } from '../vehicle-model/vehicle-model.service';
import { CreateMakeInput } from './inputs/create-make.input';
import { GetMakeByIdInput } from './inputs/get-make-by-id.inputs';
import { MakeType } from './types/make.type';
import { MakeService } from './make.service';

@Resolver(of => MakeType)
export class MakeResolver {
  constructor(
    private vehicleMakeService: MakeService,
    private vehicleModelService: VehicleModelService,
  ) {}

  @Query(returns => MakeType)
  public async getMakeById(
    @Args('getMakeByIdInput')
    getMakeByIdInput: GetMakeByIdInput,
  ): Promise<MakeType> {
    return this.vehicleMakeService.getMakeById(getMakeByIdInput);
  }

  @Query(returns => MakeType)
  public async getAllMakes(): Promise<MakeType> {
    return this.vehicleMakeService.getAllMakes();
  }

  @Mutation(of => MakeType)
  public async createMake(
    @Args('createMakeInput')
    createMakeInput: CreateMakeInput,
  ): Promise<MakeType> {
    return this.vehicleMakeService.createMake(createMakeInput);
  }

  @ResolveField()
  public async models(@Parent() make: MakeType) {
    const getManyModelsByIdInput: GetManyVehiclesByIdInput = {
      ids: make.models,
    };

    return this.vehicleModelService.getManyVehicleModelsById(
      getManyModelsByIdInput,
    );
  }
}
