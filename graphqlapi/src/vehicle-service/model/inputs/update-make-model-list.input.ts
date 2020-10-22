import { InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType('UpdateMakeModelListInput')
export class UpdateMakeModelListInput implements IUpdateMakeModelListInput {
  @IsUUID('4')
  makeId: string;

  @IsUUID('4')
  modelId: string;
}
