import { IsOptional } from 'class-validator';
import { Calendar } from 'src/calendar/entities/calendar.entity';

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
  calendar: Calendar;

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
