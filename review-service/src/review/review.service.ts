import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { RpcException } from '@nestjs/microservices';
import { Review } from './entities/review.entity';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { CreateReviewDto } from './dtos/create-review.dto';
import { GetAllUserReviewDto } from './dtos/get-all-user-review.dto';
import { GetAllParkingReviewDto } from './dtos/get-all-parking-review.dto';
import { GetReviewByIdDto } from './dtos/get-review-by-id.dto';
import { GetAllOtherUserReviewDto } from './dtos/get-all-other-user-reviews.dto';

@Injectable()
export class ReviewService {
  private logger = new Logger('ReviewService');

  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
  ) {}

  public async updateReview(updateReviewDto: UpdateReviewDto): Promise<Review> {
    this.logger.debug(
      `Received update review payload ${JSON.stringify(updateReviewDto)}`,
    );

    try {
      const { id, calification, review, title } = updateReviewDto;
      const getReviewById = new GetReviewByIdDto();
      getReviewById.id;
      const reviewData = await this.getReviewById(getReviewById);

      calification !== undefined
        ? (reviewData.calification = calification)
        : null;

      review !== undefined ? (reviewData.review = review) : null;

      title !== undefined ? (reviewData.title = title) : null;

      reviewData.updatedAt = new Date().toISOString();

      await this.reviewRepository.save(reviewData);

      return reviewData;
    } catch (error) {
      throw new RpcException('Review not Found');
    }
  }

  public async createReview(createReviewDto: CreateReviewDto): Promise<Review> {
    const {
      calification,
      parking,
      reservation,
      review,
      title,
      type,
      user,
      reviewedUser,
    } = createReviewDto;

    try {
      const id = uuid();
      const date = new Date();
      const result = this.reviewRepository.save({
        id,
        review,
        title,
        type,
        user,
        reviewedUser,
        parking,
        calification,
        reservation,
        createdAt: date.toISOString(),
        updatedAt: date.toISOString(),
      });
      return await result;
    } catch (error) {
      throw error.code === 11000
        ? new RpcException('Duplicate field')
        : new RpcException('An undefined error occured');
    }
  }

  public async getAllUserReview(
    getAllUserReviewDto: GetAllUserReviewDto,
  ): Promise<Review[]> {
    try {
      const { user } = getAllUserReviewDto;
      const reviews = this.reviewRepository.find({ user: user });
      return await reviews;
    } catch (error) {
      new RpcException('User Reviews not found');
    }
  }

  public async getAllOtherUserReview(
    getAllOtherUserReviewDto: GetAllOtherUserReviewDto,
  ): Promise<Review[]> {
    try {
      const { reviewedUser } = getAllOtherUserReviewDto;
      const reviews = this.reviewRepository.find({ reviewedUser });
      return await reviews;
    } catch (error) {
      new RpcException('User Reviews not found');
    }
  }

  public async getAllParkingReview(
    getAllParkingReviewDto: GetAllParkingReviewDto,
  ): Promise<Review[]> {
    try {
      const { parking } = getAllParkingReviewDto;
      const reviews = this.reviewRepository.find({ parking: parking });
      return await reviews;
    } catch (error) {
      new RpcException('Parking Reviews not found');
    }
  }

  public async getReviewById(getReviewById: GetReviewByIdDto): Promise<Review> {
    try {
      const { id } = getReviewById;
      const review = this.reviewRepository.findOne({ id });
      return await review;
    } catch (error) {
      throw new RpcException('Review not Found');
    }
  }

  public async getReviewByReservation(
    getReviewById: GetReviewByIdDto,
  ): Promise<Review> {
    try {
      const { id } = getReviewById;
      const review = this.reviewRepository.findOne({ reservation: id });
      return await review;
    } catch (error) {
      throw new RpcException('Review not Found');
    }
  }
}
