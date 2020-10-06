import { Field, ID, InputType } from '@nestjs/graphql';

@InputType('getManyModelsByIdInput')
export class GetManyModelsByIdInput implements IGetManyModelsByIdInput {
  @Field(type => [ID])
  ids: string[];
}
