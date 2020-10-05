import {
  BadRequestException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Query, Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth-service/strategy/auth.guard';
import { PaymentService } from './payment.service';
import { PaymentType } from './types/payment.type';
@Resolver(of => PaymentType)
export class PaymentResolver {
  constructor(private paymentService: PaymentService) {}

  @Query(returns => PaymentType)
  @UseGuards(AuthGuard)
  getUserById(@Args('id') id: string) {
    return this.paymentService.getUserById(id);
  }

  @Mutation(returns => PaymentType)
  @UseGuards(AuthGuard)
  async updateUserPassword(
    @Args('updateUserPasswordInput')
    updateUserPasswordInput: UpdateUserPasswordInput,
    @Context('user') user: JWTpayload,
  ): Promise<UserType> {
    const updateUser = await this.authService.updateUserPassword(
      updateUserPasswordInput,
      user,
    );
    return updateUser;
  }

  @Mutation(returns => PaymentType)
  async createPayment(
    @Args('createPaymentInput') createPaymentInput: CreatePaymentInput,
  ): Promise<UserType> {
    const payment = await this.paymentService.createPayment(createPaymentInput);
    if (!payment) {
      throw new BadRequestException('This payment already exists');
    }
    return payment;
  }

  @Mutation(returns => LoginType)
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
  ): Promise<LoginType> {
    const login = await this.authService.login(loginUserInput);
    if (!login) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    if (!login.user.confirmed) {
      throw new UnauthorizedException(
        'Confirm your account ' + login.user.email,
      );
    }
    return login;
  }

  @Mutation(returns => UserType)
  @UseGuards(AuthGuard)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Context('user') user: JWTpayload,
  ): Promise<UserType> {
    return await this.authService.updateUser(updateUserInput, user);
  }
}
