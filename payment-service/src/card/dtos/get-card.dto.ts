import { IsUUID } from 'class-validator';

export class GetCardDto implements IGetCardDto {
  @IsUUID('all')
  id: string;
}
