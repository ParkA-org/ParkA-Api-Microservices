export interface IUpdateParkingInput {
  id: string;

  countParking: number;

  published: boolean;

  parkingName: string;

  calendar: IUpdateCalendarPayload;

  priceHours: string;

  pictures: string[];

  mainPicture: string;

  isAvailable: boolean;

  information: string;

  features: string[];
}
