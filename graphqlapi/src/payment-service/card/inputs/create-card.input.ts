import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import { ICreatedCardInput } from '../interfaces/create-card-input.interface';

@InputType('CreateCardInput')
export class CreateCardInput implements ICreatedCardInput {
  @MinLength(2)
  @Field()
  name: string;
}
