import { Field, InputType } from '@nestjs/graphql';
import { GetReservationByIdInput } from './get-reservation-by-id.input';
import { UpdateReservationPayload } from './update-reservation.payload';

@InputType('UpdateReservationInput')
export class UpdateReservationInput implements IUpdateReservationInput {
  @Field()
  where: GetReservationByIdInput;

  @Field()
  data: UpdateReservationPayload;
}
