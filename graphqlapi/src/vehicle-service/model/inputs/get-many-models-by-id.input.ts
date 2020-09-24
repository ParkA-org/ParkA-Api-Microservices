import { Field, ID, InputType } from '@nestjs/graphql';
import { IGetManyModelsByIdInput } from '../interfaces/get-many-models-by-id-input.interface';

@InputType('getManyModelsByIdInput')
export class GetManyModelsByIdInput implements IGetManyModelsByIdInput {
  @Field(type => [ID])
  ids: string[];
}
