import { GetCountryByIdDto } from './get-country-by-id.dto';
import { UpdateCountryPayload } from './update-country-payload.dto';

export class UpdateCountryDto implements IUpdateCountryDto {
  getCountryByIdDto: GetCountryByIdDto;
  updateCountryPayload: UpdateCountryPayload;
}
