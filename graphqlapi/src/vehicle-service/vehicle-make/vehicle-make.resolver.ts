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
import { CreateVehicleMakeInput } from './vehicle-make-inputs/create-vehicle-make.input';
import { GetVehicleMakeByIdInput } from './vehicle-make-inputs/get-vehicle-make-by-id.inputs';
import { VehicleMakeType } from './vehicle-make-type/vehicle-make.type';
import { VehicleMakeService } from './vehicle-make.service';

@Resolver(of => VehicleMakeType)
export class VehicleMakeResolver {
  constructor(
    private vehicleMakeService: VehicleMakeService,
    private vehicleModelService: VehicleModelService,
  ) {}

  @Query(returns => VehicleMakeType)
  public async getVehicleMakeById(
    @Args('getVehicleMakeByIdInput')
    getVehicleMakeByIdInput: GetVehicleMakeByIdInput,
  ): Promise<VehicleMakeType> {
    return this.vehicleMakeService.getVehicleMakeById(getVehicleMakeByIdInput);
  }

  @Mutation(of => VehicleMakeType)
  public async createVehicleMake(
    @Args('createVehicleMakeInput')
    createVehicleMakeInput: CreateVehicleMakeInput,
  ): Promise<VehicleMakeType> {
    return this.vehicleMakeService.createVehicleMake(createVehicleMakeInput);
  }

  @ResolveField()
  public async models(@Parent() make: VehicleMakeType) {
    const getManyVehiclesByIdInput: GetManyVehiclesByIdInput = {
      ids: make.models,
    };

    return this.vehicleModelService.getManyVehicleModelsById(
      getManyVehiclesByIdInput,
    );
  }
}
