import { IsUUID } from "class-validator/types/decorator/string/IsUUID";
import { IGetAllMyParkingsDto } from "../interfaces/get-all-my-parkings-dto.interface";

export class GetAllMyParkings implements IGetAllMyParkingsDto{
    @IsUUID('4')
    userInformation: string;
}