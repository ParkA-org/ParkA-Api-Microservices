import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserType } from 'src/auth-service/types/user.type';
import { ParkingType } from 'src/parking-service/parking/types/parking.type';
import { PaymentType } from 'src/payment-service/payment/types/payment.type';
import { VehicleType } from 'src/vehicle-service/vehicle/types/vehicle.type';
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

  @Field(type => VehicleType)
  vehicle: string;

  @Field(type => PaymentType)
  paymentInfo: string;

  @Field(type => ParkingType)
  parking: string;

  @Field(type => UserType)
  client: string;

  @Field(type => UserType)
  owner: string;

  @Field()
  total: number;

  @Field()
  rentDate: string;

  @Field(type => ReservationStatuses)
  status: ReservationStatuses;

  @Field({ nullable: true })
  reviewed: boolean;
}
