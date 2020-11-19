interface ICalendar {
  _id: string;

  id: string;

  parkingId: string;

  monday: ISchedule[];

  tuesday: ISchedule[];

  wednesday: ISchedule[];

  thursday: ISchedule[];

  friday: ISchedule[];

  saturday: ISchedule[];

  sunday: ISchedule[];
}
