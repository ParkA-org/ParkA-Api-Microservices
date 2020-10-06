import { IsUUID } from 'class-validator';

export class UpdateCarModelListDto implements IUpdateCarMakeModelListDto {
  @IsUUID('4')
  makeId: string;

  @IsUUID('4')
  modelId: string;
}
