import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, ValidateIf } from 'class-validator';

@InputType('UpdateReservationPayload')
export class UpdateReservationPayload implements IUpdateReservationPayload {
  @Field({ nullable: true })
  @IsDateString()
  @ValidateIf(
    (input: UpdateReservationPayload) => input.checkOutDate !== undefined,
  )
  checkInDate: string;

  @Field({ nullable: true })
  @IsDateString()
  @ValidateIf(
    (input: UpdateReservationPayload) => input.checkInDate !== undefined,
  )
  checkOutDate: string;

  @Field({ nullable: true })
  vehicle: string;

  @Field({ nullable: true })
  total: number;

  @Field({ nullable: true })
  paymentInfo: string;

  @Field({ nullable: true })
  rentDate: string;
}
