import { MinLength } from 'class-validator';
import { ICreateCardDto } from '../interfaces/create-card-dto.interface';

export class CreateCardDto implements ICreateCardDto {
  @MinLength(2)
  name: string;
}
