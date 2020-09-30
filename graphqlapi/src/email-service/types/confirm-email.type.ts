import { Field, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { IConfirmEmailType } from '../interfaces/confirm-email-type.interface';
@ObjectType('ConfirmEmail')
export class ConfirmEmailType implements IConfirmEmailType {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  origin: string;
}
