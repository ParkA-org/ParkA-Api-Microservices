import { IsUUID } from 'class-validator';

export class GetAllUserVehiclesInternalInput
  implements IGetAllUserVehiclesInternalInput {
  @IsUUID('4')
  userInformationId: string;
}
