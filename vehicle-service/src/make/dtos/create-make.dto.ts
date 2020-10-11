import { IsUUID, MinLength } from 'class-validator';

export class CreateMakeDto implements ICreateMakeDto {
  @MinLength(2)
  name: string;

  icon: string;

  @IsUUID('4', { each: true })
  models: string[];
}
