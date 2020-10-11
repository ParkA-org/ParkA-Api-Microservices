import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType('GetUserInformationByIdInput')
export class GetUserInformationByIdInput
  implements IGetUserInformationByIdInput {
  @Field()
  @IsUUID('4')
  id: string;
}
