import { IsUUID } from 'class-validator';
import { IGetColorByIdDto } from '../interfaces/get-color-by-id-dto.interface';

export class GetColorByIdDto implements IGetColorByIdDto {
  @IsUUID('4')
  id: string;
}
