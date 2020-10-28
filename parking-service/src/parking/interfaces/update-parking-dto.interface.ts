interface IUpdateParkingDto {
  id: string;
  userInformation: string;
  countParking: number;
  published: boolean;
  parkingName: string;
  calendar: ICalendar;
  priceHours: string;
  pictures: string[];
  mainPicture: string;
  isAvailable: boolean;
  information: string;
  features: string[];
}
