import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import { ICreateBodyStyleInput } from '../interfaces/create-body-style-input.interface';

@InputType('createBodyStyleInput')
export class CreateBodyStyleInput implements ICreateBodyStyleInput {
  @Field()
  @MinLength(2)
  name: string;
}
