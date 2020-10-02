import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  IsDateString,
  IsUUID,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

@ObjectType('UserInformation')
export class UserInformationType implements IUserInformationType {
  @Field()
  @IsUUID('4')
  id: string;

  @Field()
  @IsUUID('4')
  paymentInformation: string;

  @Field()
  @Length(8, 14)
  documentNumber: string;

  @Field(type => [ID])
  @IsUUID('4', { each: true })
  vehicles: string[];

  @Field(type => [ID])
  @IsUUID('4', { each: true })
  parkings: string[];

  @Field()
  @MinLength(12)
  @MaxLength(13)
  telephoneNumber: string;

  @Field()
  @IsDateString()
  birthDate: string;

  @Field()
  placeOfBirth: string;

  @Field()
  nationality: string;
}
