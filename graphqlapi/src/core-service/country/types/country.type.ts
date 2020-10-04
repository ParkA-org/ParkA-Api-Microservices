import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Country')
export class CountryType implements ICountryType {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;
}
