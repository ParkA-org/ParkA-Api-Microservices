
export interface IUpdateParkingDto {
    countParking: number;
    published: boolean;
    parkingName: string;
    calendar: string;
    priceHours: string;
    pictures: string[];
    mainPicture: string;
    isAvailable: boolean;
    information: string;
    features: string[];
}