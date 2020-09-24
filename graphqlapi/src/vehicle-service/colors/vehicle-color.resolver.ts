import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateVehicleColorInput } from './vehicle-color-inputs/create-vehicle-color.input';
import { GetVehicleColorByIdInput } from './vehicle-color-inputs/get-vehicle-color-by-id.input';
import { VehicleColorType } from './vehicle-color-type/vehicle-color.type';
import { VehicleColorService } from './vehicle-color.service';

@Resolver()
export class VehicleColorResolver {
  constructor(private vehicleColorService: VehicleColorService) {}

  @Query(type => VehicleColorType)
  public async getVehicleColorById(
    @Args('getVehicleColorByIdInput')
    getVehicleColorByIdInput: GetVehicleColorByIdInput,
  ): Promise<VehicleColorType> {
    return this.vehicleColorService.getVehicleColorById(
      getVehicleColorByIdInput,
    );
  }

  @Query(type => [VehicleColorType])
  public async getAllVehicleColors(): Promise<VehicleColorType[]> {
    return this.vehicleColorService.getAllVehicleColors();
  }

  @Mutation(of => VehicleColorType)
  public async createVehicleColor(
    @Args('createVehicleColorInput')
    createVehicleColorInput: CreateVehicleColorInput,
  ): Promise<VehicleColorType> {
    return this.vehicleColorService.createVehicleColor(createVehicleColorInput);
  }
}
