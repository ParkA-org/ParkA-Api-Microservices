import { IsUUID } from 'class-validator';
import { IGetAllMyParkingsDto } from '../interfaces/get-all-my-parkings-dto.interface';

export class GetAllMyParkingsDto implements IGetAllMyParkingsDto {
  @IsUUID('4')
  userInformation: string;
}
