import { MaxLength, MinLength } from 'class-validator';

export class CreateParkingDto implements ICreateParkingDto {
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
