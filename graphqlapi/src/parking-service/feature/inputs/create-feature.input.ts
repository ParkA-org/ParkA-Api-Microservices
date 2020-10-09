import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';
import { ICreateFeatureInput } from '../interfaces/create-feature-input.interface';

@InputType()
export class CreateFeatureInput implements ICreateFeatureInput {
  @Field()
  @MinLength(2)
  @MaxLength(50)
  name: string;
}
