import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { IGetModelById } from '../interfaces/get-model-by-id-input.entity';

@InputType('getModelByIdInput')
export class GetModelByIdInput implements IGetModelById {
  @Field()
  @IsUUID('4')
  id: string;
}
