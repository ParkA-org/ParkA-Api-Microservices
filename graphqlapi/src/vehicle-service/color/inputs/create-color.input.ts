import { Field, InputType } from '@nestjs/graphql';
import { ICreateColorInput } from '../interfaces/create-color-input.interface';

@InputType('createColorInput')
export class CreateColorInput implements ICreateColorInput {
  @Field()
  name: string;
}
