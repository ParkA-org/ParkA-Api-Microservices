import { IsUUID } from 'class-validator';
import { IUpdateCarMakeModelListDto } from '../interfaces/update-car-make-model-list-dto.interface';

export class UpdateCarModelListDto implements IUpdateCarMakeModelListDto {
  @IsUUID('4')
  makeId: string;

  @IsUUID('4')
  modelId: string;
}
