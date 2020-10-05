import { GetNationalityById } from './get-nationality-by-id.dto';
import { UpdateNationalityPayload } from './update-nationality-payload.dto';

export class UpdateNationalityDto implements IUpdateNationalityDto {
  getNationalityByIdDto: GetNationalityById;
  updateNationalityPayload: UpdateNationalityPayload;
}
