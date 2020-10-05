import { CreateVehicleInput } from './create-vehicle.input';
import { UserInformationIdPayload } from './user-information-id.payload';

export class CreateVehicleInternalInput implements ICreateVehicleInternalInput {
  userInformationIdPayload: UserInformationIdPayload;
  createVehiclePayload: CreateVehicleInput;
}
