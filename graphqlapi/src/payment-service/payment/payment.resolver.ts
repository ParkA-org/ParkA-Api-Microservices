import { BadRequestException, Logger, UseGuards } from '@nestjs/common';
import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth-service/strategy/auth.guard';
import { CardService } from '../card/card.service';
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
    private cardService: CardService,
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
    return this.paymentService.deletePayment(getPaymentByIdInput);
  }

  @Mutation(returns => PaymentType)
  @UseGuards(AuthGuard)
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
}
