import { IsUUID } from 'class-validator';

export class UserInformationPayload implements IUserInformationPayload {
  @IsUUID('4')
  userInformation: string;
}
