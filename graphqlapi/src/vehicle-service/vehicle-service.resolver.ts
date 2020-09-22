import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateVehicleInput } from './vehicle-inputs/create-vehicle.input';
import { VehicleType } from './vehicle-data/vehicle.type';
import { VehicleServiceService } from './vehicle-service.service';
import { GetVehicleByIdInput } from './vehicle-inputs/find-vehicle-by-id.input';

@Resolver()
export class VehicleServiceResolver {
  constructor(private vehicleService: VehicleServiceService) {}

  @Query(returns => VehicleType)
  public async getVehicleById(
    @Args('getVehicleByIdInput')
    getVehicleByIdInput: GetVehicleByIdInput,
  ): Promise<VehicleType> {
    return this.vehicleService.getVehicle(getVehicleByIdInput);
  }

  @Mutation(of => VehicleType)
  public async createVehicle(
    @Args('createVehicleInput') createVehicleInput: CreateVehicleInput,
  ): Promise<VehicleType> {
    return await this.vehicleService.createVehicle(createVehicleInput);
  }
}
