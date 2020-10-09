import { IInternCreateParking } from '../interfaces/intern-create-parking-input.interface';

export class InternCreateParking implements IInternCreateParking {
  countParking: number;
  latitude: string;
  longitude: string;
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
