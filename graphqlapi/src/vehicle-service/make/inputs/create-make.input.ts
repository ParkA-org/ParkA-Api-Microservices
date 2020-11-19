import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID, MinLength } from 'class-validator';

@InputType('CreateMakeInput')
export class CreateMakeInput implements ICreateMakeInput {
  @Field()
  @MinLength(4)
  name: string;

  @Field()
  icon: string;

  @Field(type => [ID], { defaultValue: [], nullable: true })
  @IsUUID('4', { each: true })
  models: string[];
}
