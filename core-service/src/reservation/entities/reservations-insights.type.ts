import { IReservationsInsights } from '../interfaces/reservation-insights.interface';

export class ReservationInsights implements IReservationsInsights {
  totalEarnings: number;
  reservationTimeAverige: number;
  perDayReservations: {
    monday: number;
    tuesday: number;
    wednesday: number;
    thursday: number;
    friday: number;
    saturday: number;
    sunday: number;
  };
  perMonthReservations: {
    january: number;
    february: number;
    march: number;
    april: number;
    may: number;
    june: number;
    july: number;
    august: number;
    september: number;
    october: number;
    november: number;
    december: number;
  };
  perMonthEarning: {
    january: number;
    february: number;
    march: number;
    april: number;
    may: number;
    june: number;
    july: number;
    august: number;
    september: number;
    october: number;
    november: number;
    december: number;
  };
}
