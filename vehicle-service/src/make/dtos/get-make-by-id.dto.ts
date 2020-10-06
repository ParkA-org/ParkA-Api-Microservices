import { IsUUID } from 'class-validator';

export class GetMakeByIdDto implements IGetMakeByIdDto {
  @IsUUID('4')
  id: string;
}
