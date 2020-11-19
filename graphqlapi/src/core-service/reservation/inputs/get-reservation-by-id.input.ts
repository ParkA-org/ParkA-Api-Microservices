import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType('GetReservationById')
export class GetReservationByIdInput implements IGetReservationByIdInput {
  @Field()
  @IsUUID('4')
  id: string;
}
