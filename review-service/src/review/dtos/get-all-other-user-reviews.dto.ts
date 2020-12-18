import { IGetAllOtherUserReviewDto } from '../interfaces/get-all-other-user-reviews-dto.interface';

export class GetAllOtherUserReviewDto implements IGetAllOtherUserReviewDto {
  reviewedUser: string;
}
