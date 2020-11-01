import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType('CancelReservationInput')
export class CancelReservationInput implements ICancelReservationInput {
  @Field()
  @IsUUID()
  id: string;
}
