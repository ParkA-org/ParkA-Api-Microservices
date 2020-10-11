import { IsOptional } from 'class-validator';

export class UpdateParkingDto implements IUpdateParkingDto {
  id: string;

  userInformation: string;

  @IsOptional()
  countParking: number;

  @IsOptional()
  published: boolean;

  @IsOptional()
  parkingName: string;

  @IsOptional()
  calendar: string;

  @IsOptional()
  priceHours: string;

  @IsOptional()
  pictures: string[];

  @IsOptional()
  mainPicture: string;

  @IsOptional()
  isAvailable: boolean;

  @IsOptional()
  information: string;

  @IsOptional()
  features: string[];
}
