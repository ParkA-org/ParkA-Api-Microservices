import { IsUUID } from 'class-validator';

export class GetManyModelsByIdDto implements IGetManyModelsByIdDto {
  @IsUUID('4', { each: true })
  ids: string[];
}
