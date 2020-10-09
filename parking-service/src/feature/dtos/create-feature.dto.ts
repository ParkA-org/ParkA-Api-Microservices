import { MaxLength } from 'class-validator/types/decorator/string/MaxLength';
import { MinLength } from 'class-validator/types/decorator/string/MinLength';
import { ICreatureFeatureDto } from '../interfaces/create-feature-dto.interface';

export class CreateFeatureDto implements ICreatureFeatureDto {
  @MinLength(2)
  @MaxLength(50)
  name: string;
}
