import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Reservation')
export class ReservationType implements IReservationType {
  @Field()
  id: string;

  @Field()
  checkInDate: string;

  @Field()
  checkOutDate: string;

  @Field()
  vehicleId: string;

  @Field()
  paymentInfoId: string;

  @Field()
  rentDate: string;

  @Field()
  status: string;

  @Field()
  userId: string;
}
