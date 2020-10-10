import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType('getMakeByIdInput')
export class GetMakeByIdInput implements IGetMakeByIdInput {
  @Field()
  @IsUUID('4')
  id: string;
}
