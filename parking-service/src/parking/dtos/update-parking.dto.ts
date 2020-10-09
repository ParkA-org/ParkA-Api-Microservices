import { IsOptional } from "class-validator/types/decorator/common/IsOptional";
import { IUpdateParkingDto } from "../interfaces/update-parking-dto.interface";

export class UpdateParkingDto implements IUpdateParkingDto{

    @IsOptional()
    countParking: number;

    @IsOptional()
    published: boolean;

    @IsOptional()
    parkingName: string;

    @IsOptional()
    calendar: string;

    @IsOptional()
    priceHours: string;

    @IsOptional()
    pictures: string[];

    @IsOptional()
    mainPicture: string;

    @IsOptional()
    isAvailable: boolean;

    @IsOptional()
    information: string;

    @IsOptional()
    features: string[];

}