import { MaxLength, MinLength } from 'class-validator';
import { ICreateColorDto } from '../color-interfaces/create-color-dto.interface';

export class CreateColorDto implements ICreateColorDto {
  @MinLength(2)
  @MaxLength(20)
  name: string;
}
