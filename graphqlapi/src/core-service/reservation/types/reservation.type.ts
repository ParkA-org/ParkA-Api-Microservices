import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IReservationType } from '../interfaces/reservation-type.interface';
import { ReservationStatuses } from '../utils/statuses';

@ObjectType('Reservation')
export class ReservationType implements IReservationType {
  @Field(type => ID)
  id: string;

  @Field()
  checkInDate: string;

  @Field()
  checkOutDate: string;

  @Field()
  vehicle: string;

  @Field()
  paymentInfo: string;

  @Field()
  parking: string;

  @Field()
  client: string;

  @Field()
  owner: string;

  @Field()
  total: number;

  @Field()
  rentDate: string;

  @Field(type => ReservationStatuses)
  status: ReservationStatuses;
}
