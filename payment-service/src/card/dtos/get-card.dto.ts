import { IsUUID } from 'class-validator';
import { IGetCardDto } from '../interfaces/get-card-dto.interface';

export class GetCardDto implements IGetCardDto {
  @IsUUID('all')
  id: string;
}
