export interface IParking {
  countParking: number;
  latitude: string;
  longitude: string;
  published: boolean;
  parkingName: string;
  calendar: string;
  priceHours: string;
  pictures: string[];
  mainPicture: string;
  isAvailable: boolean;
  sector: string;
  direction: string;
  information: string;
  features: string[];
  verified: boolean;
  userInformation: string;
  rating: number;
  totalReviews: number;
}
