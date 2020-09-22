import { Args, Query, Resolver } from '@nestjs/graphql';
import { VehicleModelType } from './vehicle-model-data/vehicle-model.type';
import { GetVehicleModelByIdInput } from './vehicle-model-inputs/get-vehicle-model-by-id.input';
import { VehicleModelService } from './vehicle-model.service';

@Resolver()
export class VehicleModelResolver {
  constructor(private vehicleModelService: VehicleModelService) {}

  @Query(returns => VehicleModelType)
  public async getVehicleModelById(
    @Args() getVehicleModelByIdInput: GetVehicleModelByIdInput,
  ) {
    return await this.vehicleModelService.getVehicleModelById(
      getVehicleModelByIdInput,
    );
  }
}
