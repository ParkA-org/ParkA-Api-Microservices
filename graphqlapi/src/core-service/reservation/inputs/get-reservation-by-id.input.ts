import { Field, InputType } from '@nestjs/graphql';

@InputType('getReservationById')
export class GetReservationByIdInput implements IGetReservationByIdInput {
  @Field()
  id: string;
}
