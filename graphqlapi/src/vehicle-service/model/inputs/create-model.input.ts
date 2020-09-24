import { Field, InputType } from '@nestjs/graphql';
import { IsUUID, MinLength } from 'class-validator';
import { ICreateModelInput } from '../interfaces/create-model-input.entity';

@InputType('createModelInput')
export class CreateModelInput implements ICreateModelInput {
  @Field()
  @IsUUID('4')
  make: string;

  @Field()
  @MinLength(2)
  name: string;
}
