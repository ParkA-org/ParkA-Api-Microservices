import { Field, ID, InputType } from '@nestjs/graphql';
import { IGetCardByIdInput } from '../interfaces/get-card-by-id-input.interface';

@InputType()
export class GetCardByIdInput implements IGetCardByIdInput {
  @Field(type => ID)
  id: string;
}
