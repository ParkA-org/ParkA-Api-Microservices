import {
  BadRequestException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth-service/strategy/auth.guard';
import { CreatePaymentInput } from './inputs/create-payment.input';
import { PaymentService } from './payment.service';
import { PaymentType } from './types/payment.type';
@Resolver(of => PaymentType)
export class PaymentResolver {
  constructor(private paymentService: PaymentService) {}

  @Query(returns => PaymentType)
  @UseGuards(AuthGuard)
  deletePayment(@Args('id') id: string) {
    return this.paymentService.deletePayment(id);
  }

  @Mutation(returns => PaymentType)
  @UseGuards(AuthGuard)
  async createPayment(
    @Args('createPaymentInput') createPaymentInput: CreatePaymentInput,
  ): Promise<PaymentType> {
    const payment = await this.paymentService.createPayment(createPaymentInput);
    if (!payment) {
      throw new BadRequestException('This payment already exists');
    }
    return payment;
  }
}
