import { MinLength } from 'class-validator';

export class CreateBodyStyleDto implements ICreateBodyStyleDto {
  @MinLength(1)
  name: string;
}
