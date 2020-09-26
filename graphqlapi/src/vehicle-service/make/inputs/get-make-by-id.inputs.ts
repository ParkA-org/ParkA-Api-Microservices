import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { IGetMakeByIdInput } from '../interfaces/get-make-by-id';

@InputType('getMakeByIdInput')
export class GetMakeByIdInput implements IGetMakeByIdInput {
  @IsUUID('4')
  @Field()
  id: string;
}
