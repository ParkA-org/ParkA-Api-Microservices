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
import { VehicleColorService } from '../vehicle-color/vehicle-color.service';
import { VehicleTypeService } from '../vehicle-type/vehicle-type.service';
import { VehicleModelType } from '../vehicle-model/vehicle-model-data/vehicle-model.type';
import { GetVehicleModelByIdInput } from '../vehicle-model/vehicle-model-inputs/get-vehicle-model-by-id.input';
import { VehicleColorType } from '../vehicle-color/vehicle-color-type/vehicle-color.type';
import { GetVehicleColorByIdInput } from '../vehicle-color/vehicle-color-inputs/get-vehicle-color-by-id.input';

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

  @ResolveField(returns => VehicleModelType)
  public async model(
    @Parent() model: VehicleModelType,
  ): Promise<VehicleModelType> {
    const getVehicleModelByIdInput: GetVehicleModelByIdInput = {
      id: model.id,
    };

    return this.vehicleModelService.getVehicleModelById(
      getVehicleModelByIdInput,
    );
  }

  @ResolveField(returns => VehicleColorType)
  public async(
    @Parent() colorExterior: VehicleColorType,
  ): Promise<VehicleColorType> {
    const getVehicleColorByIdInput: GetVehicleColorByIdInput = {
      id: colorExterior.id,
    };

    return this.vehicleColorService.getVehicleColorById(
      getVehicleColorByIdInput,
    );
  }
}
