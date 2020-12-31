import { IGetReservationsInsigths } from '../interfaces/get-reservations-insights-input.interface';

export class GetReservationsInsightsInput implements IGetReservationsInsigths {
  owner: string;
  year: number;
}
