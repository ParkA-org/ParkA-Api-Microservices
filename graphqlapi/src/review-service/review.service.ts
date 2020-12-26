import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { ReservationType } from 'src/core-service/reservation/types/reservation.type';
import { ParkingType } from 'src/parking-service/parking/types/parking.type';
import { CreateInternReviewInput } from './inputs/create-intern-review.input';
import { CreateReviewInput } from './inputs/create-review.input';
import { GetAllParkingReviewInput } from './inputs/get-all-parking-review.input';
import { GetAllUserReviewInput } from './inputs/get-all-user-review.input';
import { GetAllOtherUserReviewInput } from './inputs/get-other-user-reviews.inputs';
import { GetReviewByIdInput } from './inputs/get-review-by-id.input';
import { UpdateReviewInput } from './inputs/update-review.input';
import { ReviewType } from './types/review.type';

@Injectable()
export class ReviewService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: `${process.env.REDIS_URL}`,
      },
    });
  }

  public async createReview(
    createInternReviewInput: CreateInternReviewInput,
  ): Promise<ReviewType> {
    const response = await this.client.send<ReviewType>(
      { type: 'create-review' },
      createInternReviewInput,
    );

    return response.toPromise();
  }

  public async updateReview(
    updateReviewInput: UpdateReviewInput,
  ): Promise<ReviewType> {
    const response = await this.client.send<ReviewType>(
      { type: 'update-review' },
      updateReviewInput,
    );
    return response.toPromise();
  }

  public async getReviewById(
    getReviewByIdInput: GetReviewByIdInput,
  ): Promise<ReviewType> {
    const response = await this.client.send<ReviewType>(
      { type: 'get-review-by-id' },
      getReviewByIdInput,
    );
    return response.toPromise();
  }

  public async getAllUserReviews(
    getAllUserReviewInput: GetAllUserReviewInput,
  ): Promise<ReviewType[]> {
    const response = await this.client.send<ReviewType[]>(
      { type: 'get-all-user-review' },
      getAllUserReviewInput,
    );
    return response.toPromise();
  }

  public async getAllOtherUserReview(
    getAllOtherUserReviewInput: GetAllOtherUserReviewInput,
  ): Promise<ReviewType[]> {
    const response = await this.client.send<ReviewType[]>(
      { type: 'get-all-other-user-review' },
      getAllOtherUserReviewInput,
    );
    return response.toPromise();
  }

  public async getAllParkingReviews(
    getAllParkingReviewInput: GetAllParkingReviewInput,
  ): Promise<ReviewType[]> {
    const response = await this.client.send<ReviewType[]>(
      { type: 'get-all-parking-review' },
      getAllParkingReviewInput,
    );
    return response.toPromise();
  }
}
