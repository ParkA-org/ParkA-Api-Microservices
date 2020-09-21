import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateVehicleInput } from './vehicle-data/vehicle.input';
import { VehicleType } from './vehicle-data/vehicle.type';
import { VehicleServiceService } from './vehicle-service.service';

@Resolver()
export class VehicleServiceResolver {
  constructor(private vehicleService: VehicleServiceService) {}

  @Query(returns => VehicleType)
  public async getVehicle(): Promise<VehicleType> {
    return this.vehicleService.getVehicle();
  }

  @Mutation(of => VehicleType)
  public async createVehicle(
    @Args('createVehicleInput') createVehicleInput: CreateVehicleInput,
  ): Promise<VehicleType> {
    return await this.vehicleService.createVehicle(createVehicleInput);
  }
}
