import { UpdateUserInformationPayload } from './update-user-information.payload';

export class UpdateUserInformationDto implements IUpdateUserInformationDto {
  getUserInformationByIdPayload: IGetUserInformationByIdDto;
  updateUserInformationPayload: UpdateUserInformationPayload;
}
