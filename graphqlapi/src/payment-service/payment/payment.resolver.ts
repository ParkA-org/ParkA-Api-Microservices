import { BadRequestException, Logger, UseGuards } from '@nestjs/common';
import {
  Query,
  Resolver,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { AuthGuard } from 'src/auth-service/strategy/auth.guard';
import { CardService } from '../card/card.service';
import { GetCardByIdInput } from '../card/inputs/get-card-by-id.input';
import { CardType } from '../card/types/card.type';
import { CreatePaymentInput } from './inputs/create-payment.input';
import { DeletePaymentInput } from './inputs/delete-payment.input';
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
  deletePayment(
    @Args('deletePaymentInput') deletePaymentInput: DeletePaymentInput,
  ) {
    this.logger.debug(
      `Received delete payment id data ${JSON.stringify(deletePaymentInput)}`,
    );
    return this.paymentService.deletePayment(deletePaymentInput);
  }

  @Query(returns => PaymentType)
  @UseGuards(AuthGuard)
  getPaymentById(
    @Args('getPaymentByIdInput') getPaymentByIdInput: GetPaymentByIdInput,
  ) {
    this.logger.debug(
      `Received get payment id data ${JSON.stringify(getPaymentByIdInput)}`,
    );
    return this.paymentService.getPaymentById(getPaymentByIdInput);
  }

  @Mutation(of => PaymentType)
  async createPayment(
    @Args('createPaymentInput') createPaymentInput: CreatePaymentInput,
  ): Promise<PaymentType> {
    this.logger.debug(
      `Received create payment data ${JSON.stringify(createPaymentInput)}`,
    );
    const payment = await this.paymentService.createPayment(createPaymentInput);
    if (!payment) {
      throw new BadRequestException('This payment already exists');
    }
    return payment;
  }

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
