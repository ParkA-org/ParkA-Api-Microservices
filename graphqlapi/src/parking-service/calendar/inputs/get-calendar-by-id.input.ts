import { Field, InputType } from '@nestjs/graphql';

@InputType('GetCalendarByIdInput')
export class GetCalendarByIdInput implements IGetCalendarByIdInput {
  @Field()
  id: string;
}
