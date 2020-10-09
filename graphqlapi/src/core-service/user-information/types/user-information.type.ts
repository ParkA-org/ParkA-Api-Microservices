import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CountryType } from 'src/core-service/country/types/country.type';
import { NationalityType } from 'src/core-service/nationality/types/nationality.type';

@ObjectType('UserInformation')
export class UserInformationType implements IUserInformationType {
  @Field()
  id: string;

  @Field()
  paymentInformation: string;

  @Field()
  documentNumber: string;

  @Field(type => [ID])
  vehicles: string[];

  @Field(type => [ID])
  parkings: string[];

  @Field()
  telephoneNumber: string;

  @Field()
  birthDate: string;

  @Field(type => CountryType)
  placeOfBirth: string;

  @Field(type => NationalityType)
  nationality: string;
}
