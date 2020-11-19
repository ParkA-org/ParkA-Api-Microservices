interface ICreateParkingDto {
  countParking: number;
  latitude: string;
  longitude: string;
  parkingName: string;
  calendar: ICalendar;
  priceHours: string;
  pictures: string[];
  mainPicture: string;
  sector: string;
  direction: string;
  information: string;
  features: string[];
  userInformation: string;
}
