import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType('UpdateCountryPayload')
export class UpdateCountryPayload implements IUpdateCountryPayload {
  @Field()
  @MinLength(2)
  name: string;
}
