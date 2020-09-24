import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateVehicleColorInput } from './inputs/create-vehicle-color.input';
import { GetVehicleColorByIdInput } from './inputs/get-vehicle-color-by-id.input';
import { VehicleColorType } from './types/vehicle-color.type';
import { ColorService } from './color.service';

@Resolver()
export class VehicleColorResolver {
  constructor(private vehicleColorService: ColorService) {}

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
