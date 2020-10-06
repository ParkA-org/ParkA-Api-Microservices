import { IsUUID } from 'class-validator';

export class GetAllUserVehiclesDto implements IGetAllUserVehiclesDto {
  @IsUUID('4')
  userInformationId: string;
}
