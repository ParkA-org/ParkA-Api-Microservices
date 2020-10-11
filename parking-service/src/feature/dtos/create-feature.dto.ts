import { MaxLength, MinLength } from 'class-validator';

export class CreateFeatureDto implements ICreatureFeatureDto {
  @MinLength(2)
  @MaxLength(50)
  name: string;
}
