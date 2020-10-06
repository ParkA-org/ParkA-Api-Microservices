import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType('getModelByIdInput')
export class GetModelByIdInput implements IGetModelById {
  @Field()
  @IsUUID('4')
  id: string;
}
