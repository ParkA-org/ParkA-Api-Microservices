import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateVehicleInput } from './vehicle-inputs/create-vehicle.input';
import { VehicleType } from './vehicle-data/vehicle.type';
import { VehicleServiceService } from './vehicle-service.service';
import { GetVehicleByIdInput } from './vehicle-inputs/get-vehicle-by-id.input';
import { Logger } from '@nestjs/common';

@Resolver()
export class VehicleServiceResolver {
  private logger = new Logger();

  constructor(private vehicleService: VehicleServiceService) {}

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

  @Mutation(of => VehicleType)
  public async createVehicle(
    @Args('createVehicleInput') createVehicleInput: CreateVehicleInput,
  ): Promise<VehicleType> {
    this.logger.debug(
      `Received create vehicle with data ${JSON.stringify(createVehicleInput)}`,
    );
    return await this.vehicleService.createVehicle(createVehicleInput);
  }
}
