import { IGetReservationsInsigthsDto } from '../interfaces/get-reservations-insights-dto.interface';

export class GetReservationsInsightsInput
  implements IGetReservationsInsigthsDto {
  owner: string;
  year: number;
}
