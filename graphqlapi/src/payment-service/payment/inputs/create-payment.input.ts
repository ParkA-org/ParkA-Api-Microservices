import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreatePaymentInput implements ICreatePaymentInput {
  @Field()
  @MinLength(2)
  @MaxLength(50)
  cardHolder: string;

  @Field()
  @IsDateString()
  expirationDate: string;

  @Field()
  @MinLength(16)
  @MaxLength(17)
  digit: string;

  @Field()
  card: string;

  @Field()
  @MinLength(3)
  @MaxLength(4)
  cvv: string;
}
