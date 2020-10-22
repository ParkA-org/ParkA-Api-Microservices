import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType('CreateColorInput')
export class CreateColorInput implements ICreateColorInput {
  @Field()
  @MinLength(2)
  name: string;
}
