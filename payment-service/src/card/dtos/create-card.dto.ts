import { MinLength } from 'class-validator';

export class CreateCardDto implements ICreateCardDto {
  @MinLength(2)
  name: string;
}
