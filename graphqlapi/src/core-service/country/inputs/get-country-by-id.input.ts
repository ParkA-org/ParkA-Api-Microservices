import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType('GetCountryByIdInput')
export class GetCountryByIdInput implements IGetCountryByIdInput {
  @Field()
  @IsUUID('4')
  id: string;
}
