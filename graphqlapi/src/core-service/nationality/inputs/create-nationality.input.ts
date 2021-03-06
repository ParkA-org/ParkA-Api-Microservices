import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType('CreateNationalityInput')
export class CreateNationalityInput implements ICreateNationalityInput {
  @Field()
  @MinLength(2)
  name: string;
}
