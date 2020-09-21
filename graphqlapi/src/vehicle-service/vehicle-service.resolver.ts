import { Query, Resolver } from '@nestjs/graphql';
import { VehicleType } from './vehicle-data/vehicle.type';
import { VehicleServiceService } from './vehicle-service.service';

@Resolver()
export class VehicleServiceResolver {
  constructor(private vehicleService: VehicleServiceService) {}

  @Query(returns => VehicleType)
  public async getVehicle(): Promise<VehicleType> {
    return this.vehicleService.getVehicle();
  }
}
