import { CreateVehiclePayload } from './create-vehicle.payload';
import { UserInformationIdPayload } from './user-information.payload';

export class CreateVehicleDto implements ICreateVehicleDto {
  userInformationIdPayload: UserInformationIdPayload;
  createVehiclePayload: CreateVehiclePayload;
}
