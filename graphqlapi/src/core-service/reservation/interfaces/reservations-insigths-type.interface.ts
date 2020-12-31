export interface IReservationsInsights {
  totalEarnings: number;
  reservationTimeAverige: number;
  perDayReservations: IWeekInsights;
  perMonthReservations: IMonthsInsights;
  perMonthEarning: IMonthsInsights;
}

export interface IWeekInsights {
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
}

export interface IMonthsInsights {
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
}
