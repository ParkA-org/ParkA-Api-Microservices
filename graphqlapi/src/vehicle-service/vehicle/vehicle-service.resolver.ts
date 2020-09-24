import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CreateVehicleInput } from './inputs/create-vehicle.input';
import { VehicleType } from './types/vehicle.type';
import { VehicleServiceService } from './vehicle-service.service';
import { GetVehicleByIdInput } from './inputs/get-vehicle-by-id.input';
import { Logger } from '@nestjs/common';
import { ModelService } from '../model/model.service';
import { ColorService } from '../color/color.service';
import { BodyStyleService } from '../body-style/body-style.service';
import { ModelType } from '../model/types/model.type';
import { GetModelByIdInput } from '../model/inputs/get-model-by-id.input';
import { ColorType } from '../color/types/color.type';
import { GetColorByIdInput } from '../color/inputs/get-color-by-id.input';
import { BodyStyleType } from '../body-style/types/body-style.type';
import { GetBodyStyleByIdInput } from '../body-style/inputs/get-body-style-by-id.input';
import { UpdateVehicleInput } from './inputs/update-vehicle.input';

@Resolver(of => VehicleType)
export class VehicleServiceResolver {
  private logger = new Logger();

  constructor(
    private vehicleService: VehicleServiceService,
    private vehicleModelService: ModelService,
    private vehicleColorService: ColorService,
    private vehicleTypeService: BodyStyleService,
  ) {}

  @Query(returns => VehicleType)
  public async getVehicleById(
    @Args('getVehicleByIdInput')
    getVehicleByIdInput: GetVehicleByIdInput,
  ): Promise<VehicleType> {
    this.logger.debug(
      `Received get vehicle by id with data ${JSON.stringify(
        getVehicleByIdInput,
      )}`,
    );
    return this.vehicleService.getVehicle(getVehicleByIdInput);
  }

  @Query(returns => [VehicleType])
  public async getAllVehicles(): Promise<VehicleType[]> {
    return this.vehicleService.getAllVehicles();
  }

  @Mutation(of => VehicleType)
  public async createVehicle(
    @Args('createVehicleInput') createVehicleInput: CreateVehicleInput,
  ): Promise<VehicleType> {
    this.logger.debug(
      `Received create vehicle with data ${JSON.stringify(createVehicleInput)}`,
    );
    return this.vehicleService.createVehicle(createVehicleInput);
  }

  @Mutation(of => VehicleType)
  public async updateVehicle(
    @Args('updateVehicleInput') updateVehicleInput: UpdateVehicleInput,
  ): Promise<VehicleType> {
    this.logger.debug(
      `Received update vehicle with data ${JSON.stringify(updateVehicleInput)}`,
    );
    return this.vehicleService.updateVehicle(updateVehicleInput);
  }

  //Field Resolvers
  @ResolveField(returns => ModelType)
  public async model(@Parent() vehicle: VehicleType): Promise<ModelType> {
    const getVehicleModelByIdInput: GetModelByIdInput = {
      id: vehicle.model,
    };

    return this.vehicleModelService.getModelById(getVehicleModelByIdInput);
  }

  @ResolveField(returns => ColorType)
  public async colorExterior(
    @Parent() vehicle: VehicleType,
  ): Promise<ColorType> {
    const getVehicleColorByIdInput: GetColorByIdInput = {
      id: vehicle.colorExterior,
    };

    const response = await this.vehicleColorService.getColorById(
      getVehicleColorByIdInput,
    );

    return response;
  }

  @ResolveField(returns => BodyStyleType)
  public async bodyStyle(
    @Parent() vehicle: VehicleType,
  ): Promise<BodyStyleType> {
    const getVehicleTypeByIdInput: GetBodyStyleByIdInput = {
      id: vehicle.bodyStyle,
    };

    return this.vehicleTypeService.getBodyStyleById(getVehicleTypeByIdInput);
  }
}
