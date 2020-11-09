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
import { AuthGuard } from 'src/auth-service/strategy/auth.guard';
import { JWTpayload } from 'src/auth-service/types/jwt.type';
import { GetAllUserReviewInput } from './inputs/get-all-user-review.input';
import { GetReviewByIdInput } from './inputs/get-review-by-id.input';
import { ReviewService } from './review.service';
import { ReviewType } from './types/review.type';

@Resolver(of => ReviewType)
export class ReviewResolver {
  private logger = new Logger('ReviewResolver');

  constructor(private reviewService: ReviewService) {}

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

  @UseGuards(AuthGuard)
  @Mutation(of => PaymentType)
  public async createPayment(
    @Context('user') user: JWTpayload,
    @Args('createPaymentInput') createPaymentInput: CreatePaymentInput,
  ): Promise<PaymentType> {
    this.logger.debug(
      `Received create payment data ${JSON.stringify(createPaymentInput)}`,
    );

    const createPaymentInternalInput: CreatePaymentInternalInput = {
      createPaymentPayload: createPaymentInput,
      userInformationPayload: {
        userInformation: user.userInformation,
      },
    };

    const payment = await this.paymentService.createPayment(
      createPaymentInternalInput,
    );
    if (!payment) {
      throw new BadRequestException('This payment already exists');
    }
    return payment;
  }

  @Query(returns => PaymentType)
  @UseGuards(AuthGuard)
  public async deletePayment(
    @Args('deletePaymentInput') deletePaymentInput: DeletePaymentInput,
  ) {
    this.logger.debug(
      `Received delete payment id data ${JSON.stringify(deletePaymentInput)}`,
    );
    return this.paymentService.deletePayment(deletePaymentInput);
  }

  //Field Resolvers
  @ResolveField(returns => CardType)
  public async card(@Parent() payment: PaymentType): Promise<CardType> {
    this.logger.debug(
      `Received resolve field with payload ${JSON.stringify(payment)}`,
    );

    const getPaymentCardByIdInput: GetCardByIdInput = {
      id: payment.card,
    };

    return this.paymentCardService.getCardById(getPaymentCardByIdInput);
  }
}
