import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType('GetMakeByIdInput')
export class GetMakeByIdInput implements IGetMakeByIdInput {
  @Field()
  @IsUUID('4')
  id: string;
}
