import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CreateReviewInput } from './inputs/create-review.input';
import { GetAllParkingReviewInput } from './inputs/get-all-parking-review.input';
import { GetAllUserReviewInput } from './inputs/get-all-user-review.input';
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
    createReviewInput: CreateReviewInput,
  ): Promise<ReviewType> {
    const response = await this.client.send<ReviewType>(
      { type: 'create-review' },
      createReviewInput,
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
