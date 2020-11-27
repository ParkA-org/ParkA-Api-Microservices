interface ICalendarDateTimeDto {
  time: number;
  date: ICalendarDate;
}

interface ICalendarDate {
  day: number;
  month: number;
  year: number;
}
