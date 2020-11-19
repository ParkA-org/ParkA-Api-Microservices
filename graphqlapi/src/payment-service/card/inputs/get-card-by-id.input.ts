import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { IGetCardByIdInput } from '../interfaces/get-card-by-id-input.interface';

@InputType('GetCardByIdInput')
export class GetCardByIdInput implements IGetCardByIdInput {
  @Field(type => ID)
  @IsUUID('4')
  id: string;
}
