import { IsUUID } from 'class-validator';
import { IGetMakeByIdDto } from '../make-interfaces/get-make-by-id-dto.interface';

export class GetMakeByIdDto implements IGetMakeByIdDto {
  @IsUUID('4')
  id: string;
}
