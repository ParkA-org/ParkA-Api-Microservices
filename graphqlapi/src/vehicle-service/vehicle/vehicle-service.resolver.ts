import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CreateVehicleInput } from './vehicle-inputs/create-vehicle.input';
import { VehicleType } from './vehicle-data/vehicle.type';
import { VehicleServiceService } from './vehicle-service.service';
import { GetVehicleByIdInput } from './vehicle-inputs/get-vehicle-by-id.input';
import { Logger } from '@nestjs/common';
import { VehicleModelService } from '../vehicle-model/vehicle-model.service';
import { VehicleColorService } from '../colors/vehicle-color.service';
import { VehicleTypeService } from '../vehicle-type/vehicle-type.service';
import { VehicleModelType } from '../vehicle-model/vehicle-model-data/vehicle-model.type';
import { GetVehicleModelByIdInput } from '../vehicle-model/vehicle-model-inputs/get-vehicle-model-by-id.input';
import { VehicleColorType } from '../colors/vehicle-color-type/vehicle-color.type';
import { GetVehicleColorByIdInput } from '../colors/inputs/get-vehicle-color-by-id.input';
import { VehicleTypeType } from '../vehicle-type/vehicle-type-data/vehicle-type.type';
import { GetVehicleTypeByIdInput } from '../vehicle-type/vehicle-type-inputs/get-vehicle-type-by-id.input';
import { UpdateVehicleInput } from './vehicle-inputs/update-vehicle.input';

@Resolver(of => VehicleType)
export class VehicleServiceResolver {
  private logger = new Logger();

  constructor(
    private vehicleService: VehicleServiceService,
    private vehicleModelService: VehicleModelService,
    private vehicleColorService: VehicleColorService,
    private vehicleTypeService: VehicleTypeService,
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
  public async getAllvehicles(): Promise<VehicleType[]> {
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
  @ResolveField(returns => VehicleModelType)
  public async model(
    @Parent() vehicle: VehicleType,
  ): Promise<VehicleModelType> {
    const getVehicleModelByIdInput: GetVehicleModelByIdInput = {
      id: vehicle.model,
    };

    return this.vehicleModelService.getVehicleModelById(
      getVehicleModelByIdInput,
    );
  }

  @ResolveField(returns => VehicleColorType)
  public async colorExterior(
    @Parent() vehicle: VehicleType,
  ): Promise<VehicleColorType> {
    const getVehicleColorByIdInput: GetVehicleColorByIdInput = {
      id: vehicle.colorExterior,
    };

    const response = await this.vehicleColorService.getVehicleColorById(
      getVehicleColorByIdInput,
    );

    return response;
  }

  @ResolveField(returns => VehicleTypeType)
  public async vehicleExterior(
    @Parent() vehicle: VehicleType,
  ): Promise<VehicleTypeType> {
    const getVehicleTypeByIdInput: GetVehicleTypeByIdInput = {
      id: vehicle.vehicleType,
    };

    return this.vehicleTypeService.getVehicleTypeById(getVehicleTypeByIdInput);
  }
}
