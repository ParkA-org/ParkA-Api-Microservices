import { Field, InputType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class FilterInput implements IFilterInput {
  @Field({ nullable: true })
  start: number;

  @Field({ nullable: true })
  limit: number;

  @Field(type => GraphQLJSON, { nullable: true })
  where: Record<string, any>;
}
