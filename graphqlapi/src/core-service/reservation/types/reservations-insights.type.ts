import { Field, ObjectType } from '@nestjs/graphql';
import {
  IMonthsInsights,
  IReservationsInsights,
  IWeekInsights,
} from '../interfaces/reservations-insigths-type.interface';

@ObjectType()
export class WeekInsights implements IWeekInsights {
  @Field()
  monday: number;
  @Field()
  tuesday: number;
  @Field()
  wednesday: number;
  @Field()
  thursday: number;
  @Field()
  friday: number;
  @Field()
  saturday: number;
  @Field()
  sunday: number;
}

@ObjectType()
export class MonthsInsights implements IMonthsInsights {
  @Field()
  january: number;
  @Field()
  february: number;
  @Field()
  march: number;
  @Field()
  april: number;
  @Field()
  may: number;
  @Field()
  june: number;
  @Field()
  july: number;
  @Field()
  august: number;
  @Field()
  september: number;
  @Field()
  october: number;
  @Field()
  november: number;
  @Field()
  december: number;
}

@ObjectType()
export class ReservationInsights implements IReservationsInsights {
  @Field()
  totalEarnings: number;
  @Field()
  reservationTimeAverige: number;
  @Field()
  perDayReservations: WeekInsights;
  @Field()
  perMonthReservations: MonthsInsights;
  @Field()
  perMonthEarning: MonthsInsights;
}
