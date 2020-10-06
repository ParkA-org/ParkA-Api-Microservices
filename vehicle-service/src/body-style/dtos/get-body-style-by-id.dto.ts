import { IsUUID } from 'class-validator';

export class GetBodyStyleByIdDto implements IGetBodyStyleById {
  @IsUUID('4')
  id: string;
}
