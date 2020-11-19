import { Field, ID, InputType } from '@nestjs/graphql';

@InputType('GetNationalityByIdInput')
export class GetNationalityByIdInput implements IGetNationalityByIdInput {
  @Field(type => ID)
  id: string;
}
