export interface ICreateParkingDto {
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