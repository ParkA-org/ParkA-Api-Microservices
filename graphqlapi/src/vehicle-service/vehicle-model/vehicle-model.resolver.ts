import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { VehicleModelType } from './vehicle-model-data/vehicle-model.type';
import { CreateVehicleModelInput } from './vehicle-model-inputs/create-vehicle-model.input';
import { GetVehicleModelByIdInput } from './vehicle-model-inputs/get-vehicle-model-by-id.input';
import { VehicleModelService } from './vehicle-model.service';

@Resolver()
export class VehicleModelResolver {
  constructor(private vehicleModelService: VehicleModelService) {}

  @Query(returns => VehicleModelType)
  public async getVehicleModelById(
    @Args('getVehicleModelByIdInput')
    getVehicleModelByIdInput: GetVehicleModelByIdInput,
  ) {
    return await this.vehicleModelService.getVehicleModelById(
      getVehicleModelByIdInput,
    );
  }

  @Mutation(of => VehicleModelType)
  public async createVehicleModel(
    @Args('createVehicleModelInput')
    createVehicleModelInput: CreateVehicleModelInput,
  ): Promise<VehicleModelType> {
    return await this.vehicleModelService.createVehicleModel(
      createVehicleModelInput,
    );
  }
}
