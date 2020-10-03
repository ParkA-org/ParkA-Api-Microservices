import { GetUserInformationByIdInput } from './get-user-information-by-id.input';
import { UpdateUserInformationInput } from './update-user-information.input';

export class UpdateUserInformationInternalInput
  implements IUpdateUserInformationInternalInput {
  getUserInformationByIdDto: GetUserInformationByIdInput;
  updateUserInformationPayloadDto: UpdateUserInformationInput;
}
