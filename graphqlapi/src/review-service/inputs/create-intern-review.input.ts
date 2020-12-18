import { IsUUID } from 'class-validator';
import { ICreateInternReviewInput } from '../interfaces/create-intern-review-input.interface';
import { CreateReviewInput } from './create-review.input';

export class CreateInternReviewInput implements ICreateInternReviewInput {
  parking: string;

  @IsUUID('all')
  user: string;

  reservation: string;

  title: string;

  review: string;

  calification: number;

  type: boolean;

  reviewedUser: string;
}

export class CreateInternReviewInputFunction {
  public async createReview(
    createReviewInput: CreateReviewInput,
    id: string,
  ): Promise<CreateInternReviewInput> {
    const createInternReviewInput = new CreateInternReviewInput();

    createInternReviewInput.calification = createReviewInput.calification;
    createInternReviewInput.parking = createReviewInput.parking;
    createInternReviewInput.reservation = createReviewInput.reservation;
    createInternReviewInput.review = createReviewInput.review;
    createInternReviewInput.user = id;
    createInternReviewInput.title = createReviewInput.title;
    createInternReviewInput.type = createReviewInput.type;
    createInternReviewInput.reviewedUser = createReviewInput.reviewedUser;

    return createInternReviewInput;
  }
}
