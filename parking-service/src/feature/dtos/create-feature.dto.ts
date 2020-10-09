import { MaxLength } from 'class-validator';
import { MinLength } from 'class-validator';
import { ICreatureFeatureDto } from '../interfaces/create-feature-dto.interface';

export class CreateFeatureDto implements ICreatureFeatureDto {
  @MinLength(2)
  @MaxLength(50)
  name: string;
}
