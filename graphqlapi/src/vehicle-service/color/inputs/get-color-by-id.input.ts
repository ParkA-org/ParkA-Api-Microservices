import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { IGetColorByIdInput } from '../interfaces/get-color-by-id-input.interface';

@InputType('getColorByIdInput')
export class GetColorByIdInput implements IGetColorByIdInput {
  @IsUUID('4')
  @Field()
  id: string;
}
