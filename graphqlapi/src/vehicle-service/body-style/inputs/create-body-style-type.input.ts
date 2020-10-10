import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType('createBodyStyleInput')
export class CreateBodyStyleInput implements ICreateBodyStyleInput {
  @Field()
  @MinLength(2)
  name: string;
}
