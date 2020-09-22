import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateVehicleMakeInput } from './vehicle-make-inputs/create-vehicle-make.input';
import { GetVehicleMakeByIdInput } from './vehicle-make-inputs/get-vehicle-make-by-id.inputs';
import { VehicleMakeType } from './vehicle-make-type/vehicle-make.type';
import { VehicleMakeService } from './vehicle-make.service';

@Resolver()
export class VehicleMakeResolver {
  constructor(private vehicleMakeService: VehicleMakeService) {}

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
}
