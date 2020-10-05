import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType('updateNationalityPayload')
export class UpdateNationalityPayload implements IUpdateNationalityPayload {
  @Field()
  @MinLength(2)
  name: string;
}
