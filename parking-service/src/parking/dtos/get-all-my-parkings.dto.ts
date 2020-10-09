import { IsUUID } from 'class-validator';

export class GetAllMyParkingsDto implements IGetAllMyParkingsDto {
  @IsUUID('4')
  userInformation: string;
}
