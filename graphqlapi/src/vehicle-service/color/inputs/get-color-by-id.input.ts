import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType('getColorByIdInput')
export class GetColorByIdInput implements IGetColorByIdInput {
  @IsUUID('4')
  @Field()
  id: string;
}
