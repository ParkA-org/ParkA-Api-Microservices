import { GetVehicleByIdInput } from './get-vehicle-by-id.input';
import { UpdateVehicleInput } from './update-vehicle.input';
import { UpdateVehiclePayload } from './update-vehicle.payload';
import { UserInformationIdPayload } from './user-information-id.payload';

export class UpdateVehicleInternalInput implements IUpdateVehicleInternalInput {
  getVehicleByIdPayload: GetVehicleByIdInput;
  userInformationIdPayload: UserInformationIdPayload;
  updateVehiclePayload: UpdateVehiclePayload;
}
