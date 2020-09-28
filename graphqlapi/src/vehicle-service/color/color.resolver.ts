import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateColorInput } from './inputs/create-color.input';
import { GetColorByIdInput } from './inputs/get-color-by-id.input';
import { ColorType } from './types/color.type';
import { ColorService } from './color.service';
import { Logger } from '@nestjs/common';

@Resolver(of => ColorType)
export class ColorResolver {
  private logger = new Logger(`ColorResolver`);

  constructor(private colorService: ColorService) {}

  @Query(type => ColorType)
  public async getColorById(
    @Args('getColorByIdInput')
    getColorByIdInput: GetColorByIdInput,
  ): Promise<ColorType> {
    this.logger.debug(
      `Received get color by id with payload ${JSON.stringify(
        getColorByIdInput,
      )}`,
    );

    return this.colorService.getColorById(getColorByIdInput);
  }

  @Query(type => [ColorType])
  public async getAllColors(): Promise<ColorType[]> {
    this.logger.debug(`Received get all colors`);

    return this.colorService.getAllColors();
  }

  @Mutation(of => ColorType)
  public async createColor(
    @Args('createColorInput')
    createColorInput: CreateColorInput,
  ): Promise<ColorType> {
    this.logger.debug(
      `Received create color input ${JSON.stringify(createColorInput)}`,
    );

    return this.colorService.createColor(createColorInput);
  }
}
