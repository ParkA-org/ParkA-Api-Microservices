import { IsUUID, MinLength } from 'class-validator';
import { ICreateMakeDto } from '../make-interfaces/create-make-dto.interface';

export class CreateMakeDto implements ICreateMakeDto {
  @MinLength(2)
  name: string;

  icon: string;

  @IsUUID('4', { each: true })
  models: string[];
}
