import { GetUserInformationByIdDto } from './get-user-information-by-id.dto';
import { UpdateUserInformationPayload } from './update-user-information.payload';

export class UpdateUserInformationDto implements IUpdateUserInformationDto {
  getUserInformationByIdPayload: GetUserInformationByIdDto;
  updateUserInformationPayload: UpdateUserInformationPayload;
}
