import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { IGetBodyStyleByIdInput } from '../interfaces/get-body-style-by-id-input.interface';

@InputType('getBodyStyleByIdInput')
export class GetBodyStyleByIdInput implements IGetBodyStyleByIdInput {
  @IsUUID('4')
  @Field()
  id: string;
}
