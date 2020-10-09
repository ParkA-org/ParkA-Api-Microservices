import { MaxLength } from "class-validator/types/decorator/string/MaxLength";
import { MinLength } from "class-validator/types/decorator/string/MinLength";
import { ICreateParkingDto } from "../interfaces/create-parking-dto.interface";

export class CreateParkingDto implements ICreateParkingDto{
    countParking: number;
    latitude: string;
    longitude: string;
    @MinLength(2)
    @MaxLength(50)
    parkingName: string;
    calendar: string[];
    priceHours: string;
    pictures: string[];
    mainPicture: string;
    sector: string;
    direction: string;
    information: string;
    features: string[];
    userInformation: string;
}