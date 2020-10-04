import { GetNationalityById } from './get-nationality-by-id.dto';

export class UpdateNationalityDto implements IUpdateNationalityDto {
  getNationalityByIdDto: GetNationalityById;
  updateNationalityPayload: { name: string };
}
