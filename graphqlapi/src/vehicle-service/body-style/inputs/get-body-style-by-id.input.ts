import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
@InputType('getBodyStyleByIdInput')
export class GetBodyStyleByIdInput implements IGetBodyStyleByIdInput {
  @Field()
  @IsUUID('4')
  id: string;
}
