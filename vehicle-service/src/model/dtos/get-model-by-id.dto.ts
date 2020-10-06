import { IsUUID } from 'class-validator';

export class GetModelByIdDto implements IGetModelByIdDto {
  @IsUUID('4')
  id: string;
}
