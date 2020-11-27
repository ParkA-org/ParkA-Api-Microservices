export interface IParkingType {
  id: string;
  countParking: number;
  latitude: number;
  longitude: number;
  published: boolean;
  parkingName: string;
  calendar: string;
  priceHours: number;
  pictures: string[];
  mainPicture: string;
  isAvailable: boolean;
  sector: string;
  direction: string;
  information: string;
  features: string[];
  verified: boolean;
  userInformation: string;
  user: string;
  rating: number;
}
