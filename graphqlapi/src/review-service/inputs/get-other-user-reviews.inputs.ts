import { Field, InputType } from '@nestjs/graphql';
import { IGetAllOtherUserReviewInput } from '../interfaces/get-other-user-reviews-input';

@InputType()
export class GetAllOtherUserReviewInput implements IGetAllOtherUserReviewInput {
  @Field()
  reviewedUser: string;
}
