import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateColorInput } from './inputs/create-color.input';
import { GetColorByIdInput } from './inputs/get-color-by-id.input';
import { ColorType } from './types/color.type';
import { ColorService } from './color.service';

@Resolver()
export class ColorResolver {
  constructor(private vehicleColorService: ColorService) {}

  @Query(type => ColorType)
  public async getVehicleColorById(
    @Args('getVehicleColorByIdInput')
    getVehicleColorByIdInput: GetColorByIdInput,
  ): Promise<ColorType> {
    return this.vehicleColorService.getVehicleColorById(
      getVehicleColorByIdInput,
    );
  }

  @Query(type => [ColorType])
  public async getAllVehicleColors(): Promise<ColorType[]> {
    return this.vehicleColorService.getAllVehicleColors();
  }

  @Mutation(of => ColorType)
  public async createVehicleColor(
    @Args('createVehicleColorInput')
    createVehicleColorInput: CreateColorInput,
  ): Promise<ColorType> {
    return this.vehicleColorService.createVehicleColor(createVehicleColorInput);
  }
}
