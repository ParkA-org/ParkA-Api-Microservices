import { IsUUID } from 'class-validator';
import { IGetModelByIdDto } from '../interfaces/get-model-by-id-dto.interface';

export class GetModelByIdDto implements IGetModelByIdDto {
  @IsUUID('4')
  id: string;
}
