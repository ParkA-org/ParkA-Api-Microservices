import { IsUUID } from 'class-validator';

export class ValidateUser implements IValidateUser {
  @IsUUID()
  id: string;
}
