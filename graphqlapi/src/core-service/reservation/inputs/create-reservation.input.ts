import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsPositive, IsUUID } from 'class-validator';
import { ICreateReservationInput } from '../interfaces/create-reservation-input.interface';

@InputType('CreateReservationInput')
export class CreateReservationInput implements ICreateReservationInput {
  @Field()
  @IsUUID()
  parking: string;

  @Field()
  @IsUUID()
  client: string;

  @Field()
  @IsUUID()
  owner: string;

  @Field()
  @IsDateString()
  checkInDate: string;

  @Field()
  @IsDateString()
  checkOutDate: string;

  @Field()
  @IsUUID()
  vehicle: string;

  @Field()
  @IsUUID()
  paymentInfo: string;

  @Field()
  @IsPositive()
  total: number;

  @Field()
  @IsDateString()
  rentDate: string;
}
