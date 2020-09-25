import { MinLength } from 'class-validator';
import { ICreateBodyStyleDto } from '../interfaces/create-body-style-dto.interface';

export class CreateBodyStyleDto implements ICreateBodyStyleDto {
  @MinLength(1)
  name: string;
}
