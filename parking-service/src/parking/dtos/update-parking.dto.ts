import { IsOptional } from 'class-validator';
import { UpdateCalendarDto } from 'src/calendar/dtos/update-calendar.dto';
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
  calendar: UpdateCalendarDto;

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
