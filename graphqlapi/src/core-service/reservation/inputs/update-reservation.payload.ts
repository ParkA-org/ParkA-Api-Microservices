import { Field, InputType } from '@nestjs/graphql';

@InputType('UpdateReservationPayload')
export class UpdateReservationPayload implements IUpdateReservationPayload {
  @Field()
  checkInDate: string;

  @Field()
  checkOutDate: string;

  @Field()
  vehicle: string;

  @Field()
  total: number;

  @Field()
  paymentInfo: string;

  @Field()
  rentDate: string;
}
