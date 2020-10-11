import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Nationality')
export class NationalityType implements INationalityType {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;
}
