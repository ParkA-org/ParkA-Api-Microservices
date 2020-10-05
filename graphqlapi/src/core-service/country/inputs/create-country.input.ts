import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType('createCountryInput')
export class CreateCountryInput implements ICreateCountryinput {
  @Field()
  @MinLength(2)
  name: string;
}
