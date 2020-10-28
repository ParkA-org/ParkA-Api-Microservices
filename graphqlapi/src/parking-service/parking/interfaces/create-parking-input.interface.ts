export interface ICreateParkingInput {
  countParking: number;
  latitude: string;
  longitude: string;
  parkingName: string;
  calendar: ICreateCalendarInput;
  priceHours: string;
  pictures: string[];
  mainPicture: string;
  sector: string;
  direction: string;
  information: string;
  features: string[];
}
