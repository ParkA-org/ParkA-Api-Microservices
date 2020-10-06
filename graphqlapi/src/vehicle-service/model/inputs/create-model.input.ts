import { Field, InputType } from '@nestjs/graphql';
import { IsUUID, MinLength } from 'class-validator';

@InputType('createModelInput')
export class CreateModelInput implements ICreateModelInput {
  @Field()
  @IsUUID('4')
  make: string;

  @Field()
  @MinLength(2)
  name: string;
}
