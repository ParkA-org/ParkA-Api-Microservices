import { IsUUID, MinLength } from 'class-validator';
import { ICreateModelDto } from '../vehicle-interfaces/create-model-dto.interface';

export class CreateModelDto implements ICreateModelDto {
  @IsUUID('4')
  make: string;
  @MinLength(2)
  name: string;
}
