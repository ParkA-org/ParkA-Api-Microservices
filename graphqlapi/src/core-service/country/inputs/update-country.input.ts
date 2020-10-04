import { Field, InputType } from '@nestjs/graphql';
import { GetCountryByIdInput } from './get-country-by-id.input';
import { UpdateCountryPayload } from './update-country-payload.input';

@InputType('updateCountryInput')
export class UpdateCountryInput implements IUpdateCountryInput {
  @Field()
  getCountryByIdPayload: GetCountryByIdInput;

  @Field()
  updateCountryPayload: UpdateCountryPayload;
}
