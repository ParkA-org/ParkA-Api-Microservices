import { IsUUID } from 'class-validator';
import { IGetModelByIdDto } from '../vehicle-interfaces/get-model-by-id-dto.interface';

export class GetModelByIsDto implements IGetModelByIdDto {
  @IsUUID('4')
  id: string;
}
