import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class UserType {
  @Field(type => ID)
  id: string;

  @Field(type => ID)
  _id: string;

  @Field()
  name: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  profilePicture?: string;

  @Field()
  createAt: string;

  @Field()
  updateAt: string;

  @Field()
  confirmed: boolean;

  // @Field()
  // crendetial: Credential;
}
