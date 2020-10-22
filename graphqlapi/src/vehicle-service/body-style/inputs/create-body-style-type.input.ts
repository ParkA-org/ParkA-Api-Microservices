import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType('CreateBodyStyleInput')
export class CreateBodyStyleInput implements ICreateBodyStyleInput {
  @Field()
  @MinLength(2)
  name: string;
}
