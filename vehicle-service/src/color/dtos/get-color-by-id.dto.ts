import { IsUUID } from 'class-validator';

export class GetColorByIdDto implements IGetColorByIdDto {
  @IsUUID('4')
  id: string;
}
