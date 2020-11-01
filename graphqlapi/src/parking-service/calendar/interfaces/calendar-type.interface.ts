interface ICalendarType {
  id: string;

  parkingId: string;

  monday: IScheduleType[];

  tuesday: IScheduleType[];

  wednesday: IScheduleType[];

  thursday: IScheduleType[];

  friday: IScheduleType[];

  saturday: IScheduleType[];

  sunday: IScheduleType[];
}
