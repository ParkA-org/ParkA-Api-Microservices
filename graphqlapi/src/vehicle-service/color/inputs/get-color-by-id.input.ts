import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType('GetColorByIdInput')
export class GetColorByIdInput implements IGetColorByIdInput {
  @Field()
  @IsUUID('4')
  id: string;
}
