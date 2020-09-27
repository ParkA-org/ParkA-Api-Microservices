import { Field, ID, InputType } from '@nestjs/graphql';
import { IUpdateUserInput } from '../interfaces/update-user-input.interface';

@InputType()
export class UpdateUserInput implements IUpdateUserInput {
  @Field(type => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  profilePicture?: string;
}
