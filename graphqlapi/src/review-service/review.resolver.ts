import { BadRequestException, Logger, UseGuards } from '@nestjs/common';
import {
  Query,
  Resolver,
  Mutation,
  Args,
  Parent,
  ResolveField,
  Context,
} from '@nestjs/graphql';
import { argsToArgsConfig } from 'graphql/type/definition';
import { AuthService } from 'src/auth-service/auth.service';
import { AuthGuard } from 'src/auth-service/strategy/auth.guard';
import { JWTpayload } from 'src/auth-service/types/jwt.type';
import { UserType } from 'src/auth-service/types/user.type';
import { GetReservationByIdInput } from 'src/core-service/reservation/inputs/get-reservation-by-id.input';
import { ReservationService } from 'src/core-service/reservation/reservation.service';
import { ReservationType } from 'src/core-service/reservation/types/reservation.type';
import { ParkingService } from 'src/parking-service/parking/parking.service';
import { ParkingType } from 'src/parking-service/parking/types/parking.type';
import { CreateReviewInput } from './inputs/create-review.input';
import { GetAllParkingReviewInput } from './inputs/get-all-parking-review.input';
import { GetAllUserReviewInput } from './inputs/get-all-user-review.input';
import { GetReviewByIdInput } from './inputs/get-review-by-id.input';
import { UpdateReviewInput } from './inputs/update-review.input';
import { ReviewService } from './review.service';
import { ReviewType } from './types/review.type';

@Resolver(of => ReviewType)
export class ReviewResolver {
  private logger = new Logger('ReviewResolver');

  constructor(
    private reviewService: ReviewService,
    private authService: AuthService,
    private parkingService: ParkingService,
    private reservationService: ReservationService,
  ) {}

  @Query(returns => ReviewType)
  public async getReviewById(
    @Args('getPaymentByIdInput') getReviewByIdInput: GetReviewByIdInput,
  ) {
    this.logger.debug(
      `Received get review id data ${JSON.stringify(getReviewByIdInput)}`,
    );
    return this.reviewService.getReviewById(getReviewByIdInput);
  }

  @Query(returns => [ReviewType])
  @UseGuards(AuthGuard)
  public async getAllUserReviews(@Context('user') user: JWTpayload) {
    this.logger.debug(`Received get all payments`);
    const getAllUserReviewInput = new GetAllUserReviewInput();
    getAllUserReviewInput.user = user.id;
    return this.reviewService.getAllUserReviews(getAllUserReviewInput);
  }

  @Query(returns => [ReviewType])
  @UseGuards(AuthGuard)
  public async getAllParkingReviews(
    @Args('getAllParkingReviewInput')
    getAllParkingReviewInput: GetAllParkingReviewInput,
  ) {
    this.logger.debug(`Received get all parking reviews`);
    return this.reviewService.getAllParkingReviews(getAllParkingReviewInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(of => ReviewType)
  public async createReview(
    @Context('user') user: JWTpayload,
    @Args('createReviewInput') createReviewInput: CreateReviewInput,
  ): Promise<ReviewType> {
    this.logger.debug(
      `Received create review data ${JSON.stringify(createReviewInput)}`,
    );

    createReviewInput.user = user.id;

    const review = await this.reviewService.createReview(createReviewInput);
    if (!review) {
      throw new BadRequestException('This review already exists');
    }
    return review;
  }

  @UseGuards(AuthGuard)
  @Mutation(of => ReviewType)
  public async updateReview(
    @Context('user') user: JWTpayload,
    @Args('updateReviewInput') updateReviewInput: UpdateReviewInput,
  ): Promise<ReviewType> {
    this.logger.debug(
      `Received upate review data ${JSON.stringify(updateReviewInput)}`,
    );

    return await this.reviewService.updateReview(updateReviewInput);
  }

  //Field Resolvers
  @ResolveField(returns => UserType)
  public async user(@Parent() review: ReviewType): Promise<UserType> {
    this.logger.debug(
      `Received resolve field with payload ${JSON.stringify(review)}`,
    );

    return this.authService.getUserById(review.user);
  }

  @ResolveField(returns => UserType)
  public async parking(@Parent() review: ReviewType): Promise<ParkingType> {
    this.logger.debug(
      `Received resolve field with payload ${JSON.stringify(review)}`,
    );

    return this.parkingService.getParkingById(review.parking);
  }

  @ResolveField(returns => UserType)
  public async reservation(
    @Parent() review: ReviewType,
  ): Promise<ReservationType> {
    this.logger.debug(
      `Received resolve field with payload ${JSON.stringify(review)}`,
    );

    const getReservationByIdInput = new GetReservationByIdInput();
    getReservationByIdInput.id = review.reservation;

    return this.reservationService.getReservationById(getReservationByIdInput);
  }
}
