import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
@InputType('getBodyStyleByIdInput')
export class GetBodyStyleByIdInput implements IGetBodyStyleByIdInput {
  @IsUUID('4')
  @Field()
  id: string;
}
