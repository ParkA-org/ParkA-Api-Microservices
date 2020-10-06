import { GetVehicleByIdDto } from './get-vehicle-by-id.dto';
import { UpdateVehiclePayload } from './update-vehicle.payload';
import { UserInformationIdPayload } from './user-information.payload';

export class UpdateVehicleDto implements IUpdateVehicleDto {
  getVehicleByIdPayload: GetVehicleByIdDto;
  userInformationIdPayload: UserInformationIdPayload;
  updateVehiclePayload: UpdateVehiclePayload;
}
