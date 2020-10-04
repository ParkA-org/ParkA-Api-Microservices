import { Field, InputType } from '@nestjs/graphql';
import { GetNationalityByIdInput } from './get-nationality-by-id.input';
import { UpdateNationalityPayload } from './update-nationality-payload.input';

@InputType('updateNationalityInput')
export class UpdateNationalityInput implements IUpdateNationalityInput {
  @Field()
  getNationalityByIdDto: GetNationalityByIdInput;
  @Field()
  updateNationalityPayload: UpdateNationalityPayload;
}
