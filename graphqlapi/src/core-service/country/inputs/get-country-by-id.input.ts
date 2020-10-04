import { InputType } from '@nestjs/graphql';

@InputType('getCountryByIdInput')
export class GetCountryByIdInput implements IGetCountryByIdInput {
  id: string;
}
