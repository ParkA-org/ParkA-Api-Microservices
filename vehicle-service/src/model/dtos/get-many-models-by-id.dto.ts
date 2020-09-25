import { IsUUID } from 'class-validator';
import { IGetManyModelsByIdDto } from '../interfaces/get-many-models-by-id-dto.interface';

export class GetManyModelsByIdDto implements IGetManyModelsByIdDto {
  @IsUUID('4', { each: true })
  ids: string[];
}
