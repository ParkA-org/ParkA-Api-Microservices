import { MaxLength, MinLength } from 'class-validator';

export class CreateColorDto implements ICreateColorDto {
  @MinLength(2)
  @MaxLength(20)
  name: string;
}
