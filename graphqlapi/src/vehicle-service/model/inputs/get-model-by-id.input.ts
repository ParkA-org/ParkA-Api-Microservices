import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType('GetModelByIdInput')
export class GetModelByIdInput implements IGetModelById {
  @Field()
  @IsUUID('4')
  id: string;
}
