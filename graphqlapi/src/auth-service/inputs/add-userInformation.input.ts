import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { IAddUserInformationInput } from '../interfaces/add-userInformation-input.interface';

@InputType('AddUserInformationInput')
export class AddUserInformationInput implements IAddUserInformationInput {
  @Field({ nullable: true })
  id: string;
  @Field()
  @IsUUID()
  userInformation: string;
}
