import { Field, InputType } from '@nestjs/graphql';

@InputType('createColorInput')
export class CreateColorInput implements ICreateColorInput {
  @Field()
  name: string;
}
