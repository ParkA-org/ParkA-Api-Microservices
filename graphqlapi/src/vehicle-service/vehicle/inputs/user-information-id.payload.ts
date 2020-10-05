import { IsUUID } from 'class-validator';

export class UserInformationIdPayload implements IUserInformationPayload {
  @IsUUID('4')
  userInformationId: string;
}
