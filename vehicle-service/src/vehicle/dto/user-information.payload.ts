import { IsUUID } from 'class-validator';

export class UserInformationIdPayload implements IUserInformationIdPayload {
  @IsUUID('4')
  userInformationId: string;
}
