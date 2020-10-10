import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CreateVehicleInput } from './inputs/create-vehicle.input';
import { VehicleType } from './types/vehicle.type';
import { VehicleService } from './vehicle.service';
import { GetVehicleByIdInput } from './inputs/get-vehicle-by-id.input';
import { Logger, UseGuards } from '@nestjs/common';
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
import { AuthGuard } from 'src/auth-service/strategy/auth.guard';
import { JWTpayload } from 'src/auth-service/types/jwt.type';
import { UserInformationIdPayload } from './inputs/user-information-id.payload';
import { CreateVehicleInternalInput } from './inputs/create-vehicle-internal.input';
import { GetAllUserVehiclesInternalInput } from './inputs/get-all-user-vehicles.input';
import { UpdateVehicleInternalInput } from './inputs/update-vehicle-internal.input';

@Resolver(of => VehicleType)
export class VehicleResolver {
  private logger = new Logger();

  constructor(
    private vehicleService: VehicleService,
    private vehicleModelService: ModelService,
    private vehicleColorService: ColorService,
    private vehicleTypeService: BodyStyleService,
  ) {}

  @UseGuards(AuthGuard)
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

    return this.vehicleService.getVehicleById(getVehicleByIdInput);
  }

  @UseGuards(AuthGuard)
  @Query(returns => [VehicleType])
  public async getAllUserVehicles(
    @Context('user') user: JWTpayload,
  ): Promise<VehicleType[]> {
    this.logger.debug(`Received get all user vehicles`);

    const getAllUserVehiclesInternalInput: GetAllUserVehiclesInternalInput = {
      userInformationId: user.userInformation,
    };

    return this.vehicleService.getAllUserVehicles(
      getAllUserVehiclesInternalInput,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(of => VehicleType)
  public async createVehicle(
    @Args('createVehicleInput') createVehicleInput: CreateVehicleInput,
    @Context('user') user: JWTpayload,
  ): Promise<VehicleType> {
    this.logger.debug(
      `Received create vehicle with data ${JSON.stringify(createVehicleInput)}`,
    );

    const userInformationIdPayload: UserInformationIdPayload = {
      userInformationId: user.userInformation,
    };

    const createVehicleInternalInput: CreateVehicleInternalInput = {
      createVehiclePayload: createVehicleInput,
      userInformationIdPayload,
    };

    return this.vehicleService.createVehicle(createVehicleInternalInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(of => VehicleType)
  public async updateVehicle(
    @Args('updateVehicleInput') updateVehicleInput: UpdateVehicleInput,
    @Context('user') user: JWTpayload,
  ): Promise<VehicleType> {
    this.logger.debug(
      `Received update vehicle with data ${JSON.stringify(updateVehicleInput)}`,
    );

    const { getVehicleByIdPayload, updateVehiclePayload } = updateVehicleInput;

    const updateVehicleInternalInput: UpdateVehicleInternalInput = {
      getVehicleByIdPayload,
      updateVehiclePayload,
      userInformationIdPayload: {
        userInformationId: user.userInformation,
      },
    };

    return this.vehicleService.updateVehicle(updateVehicleInternalInput);
  }

  //Field Resolvers
  @ResolveField(returns => ModelType)
  public async model(@Parent() vehicle: VehicleType): Promise<ModelType> {
    this.logger.debug(
      `Received resolve field with payload ${JSON.stringify(vehicle)}`,
    );

    const getVehicleModelByIdInput: GetModelByIdInput = {
      id: vehicle.model,
    };

    return this.vehicleModelService.getModelById(getVehicleModelByIdInput);
  }

  @ResolveField(returns => ColorType)
  public async colorExterior(
    @Parent() vehicle: VehicleType,
  ): Promise<ColorType> {
    this.logger.debug(
      `Received resolve field with payload ${JSON.stringify(vehicle)}`,
    );

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
    this.logger.debug(
      `Received resolve field with payload ${JSON.stringify(vehicle)}`,
    );

    const getVehicleTypeByIdInput: GetBodyStyleByIdInput = {
      id: vehicle.bodyStyle,
    };

    return this.vehicleTypeService.getBodyStyleById(getVehicleTypeByIdInput);
  }
}
