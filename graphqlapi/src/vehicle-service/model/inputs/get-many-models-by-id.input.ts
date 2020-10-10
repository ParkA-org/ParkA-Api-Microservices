import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType('getManyModelsByIdInput')
export class GetManyModelsByIdInput implements IGetManyModelsByIdInput {
  @Field(type => [ID])
  @IsUUID('4', { each: true })
  ids: string[];
}
