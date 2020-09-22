import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { VehicleTypeType } from './vehicle-type-data/vehicle-type.type';
import { CreateVehicleTypeInput } from './vehicle-type-inputs/create-vehicle-type.input';
import { GetVehicleTypeByIdInput } from './vehicle-type-inputs/get-vehicle-type-by-id.input';
import { VehicleTypeService } from './vehicle-type.service';

@Resolver()
export class VehicleTypeResolver {
  constructor(private vehicleTypeService: VehicleTypeService) {}

  @Query(returns => VehicleTypeType)
  public async getVehicleTypeById(
    @Args('getVehicleTypeByIdInput')
    getVehicleTypeByIdInput: GetVehicleTypeByIdInput,
  ): Promise<VehicleTypeType> {
    return this.vehicleTypeService.getVehicleTypeById(getVehicleTypeByIdInput);
  }

  @Query(returns => [VehicleTypeType])
  public async getAllVehicleTypes(): Promise<VehicleTypeType[]> {
    return this.vehicleTypeService.getAllVehicleTypes();
  }

  @Mutation(of => VehicleTypeType)
  public async createVehicleType(
    @Args('createVehicleTypeInput')
    createVehicleTypeInput: CreateVehicleTypeInput,
  ): Promise<VehicleTypeType> {
    return this.vehicleTypeService.createVehicleType(createVehicleTypeInput);
  }
}
