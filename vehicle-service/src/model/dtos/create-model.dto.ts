import { IsUUID, MinLength } from 'class-validator';

export class CreateModelDto implements ICreateModelDto {
  @IsUUID('4')
  make: string;
  @MinLength(2)
  name: string;
}
