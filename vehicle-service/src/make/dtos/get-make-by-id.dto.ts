import { IsUUID } from 'class-validator';
import { IGetMakeByIdDto } from '../interfaces/get-make-by-id-dto.interface';

export class GetMakeByIdDto implements IGetMakeByIdDto {
  @IsUUID('4')
  id: string;
}
