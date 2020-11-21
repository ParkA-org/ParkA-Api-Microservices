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
import { CardService } from '../card/card.service';
import { GetCardByIdInput } from '../card/inputs/get-card-by-id.input';
import { CardType } from '../card/types/card.type';
import { CreatePaymentInternalInput } from './inputs/create-payment-internal.input';
import { CreatePaymentInput } from './inputs/create-payment.input';
import { DeletePaymentInput } from './inputs/delete-payment.input';
import { GetAllUserPaymentInternalInput } from './inputs/get-all-user-payments-internal.input';
import { GetPaymentByIdInput } from './inputs/get-payment-by-id.input';
import { PaymentService } from './payment.service';
import { PaymentType } from './types/payment.type';
@Resolver(of => PaymentType)
export class PaymentResolver {
  private logger = new Logger('PaymentResolver');

  constructor(
    private paymentService: PaymentService,
    private paymentCardService: CardService,
  ) {}

  @Query(returns => PaymentType)
  @UseGuards(AuthGuard)
  public async getPaymentById(
    @Args('getPaymentByIdInput') getPaymentByIdInput: GetPaymentByIdInput,
  ) {
    this.logger.debug(
      `Received get payment id data ${JSON.stringify(getPaymentByIdInput)}`,
    );
    return this.paymentService.getPaymentById(getPaymentByIdInput);
  }

  @Query(returns => [PaymentType])
  @UseGuards(AuthGuard)
  public async getAllUserPayments(@Context('user') user: JWTpayload) {
    this.logger.debug(`Received get all payments`);
    const getAllUserPayment = new GetAllUserPaymentInternalInput();
    getAllUserPayment.userInformation = user.userInformation;
    return this.paymentService.getAllUserPayments(getAllUserPayment);
  }

  @UseGuards(AuthGuard)
  @Mutation(of => PaymentType)
  public async updatePayment(
    @Context('user') user: JWTpayload,
    @Args('updatePaymentInput') updatePaymentInput: UpdatePaymentInput,
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
