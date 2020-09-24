import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateColorInput } from './inputs/create-color.input';
import { GetColorByIdInput } from './inputs/get-color-by-id.input';
import { ColorType } from './types/color.type';
import { ColorService } from './color.service';

@Resolver()
export class ColorResolver {
  constructor(private vehicleColorService: ColorService) {}

  @Query(type => ColorType)
  public async getColorById(
    @Args('getColorByIdInput')
    getColorByIdInput: GetColorByIdInput,
  ): Promise<ColorType> {
    return this.vehicleColorService.getColorById(getColorByIdInput);
  }

  @Query(type => [ColorType])
  public async getAllColors(): Promise<ColorType[]> {
    return this.vehicleColorService.getAllColors();
  }

  @Mutation(of => ColorType)
  public async createColor(
    @Args('createColorInput')
    createColorInput: CreateColorInput,
  ): Promise<ColorType> {
    return this.vehicleColorService.createColor(createColorInput);
  }
}
