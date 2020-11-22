import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { JWTpayload } from 'src/auth-service/types/jwt.type';
import { CreatePaymentInternalInput } from './inputs/create-payment-internal.input';
import { DeletePaymentInput } from './inputs/delete-payment.input';
import { GetAllUserPaymentInternalInput } from './inputs/get-all-user-payments-internal.input';
import { GetPaymentByIdInput } from './inputs/get-payment-by-id.input';
import { UpdatePaymentInternalInput } from './inputs/update-payment-internal.input';
import { PaymentType } from './types/payment.type';

@Injectable()
export class PaymentService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: `${process.env.REDIS_URL}`,
      },
    });
  }

  public async createPayment(
    createPaymentInternalInput: CreatePaymentInternalInput,
  ): Promise<PaymentType> {
    const response = await this.client.send<PaymentType>(
      { type: 'create-payment' },
      createPaymentInternalInput,
    );
    return response.toPromise();
  }

  public async updatePayment(
    updatePaymentInternalInput: UpdatePaymentInternalInput,
  ): Promise<PaymentType> {
    const response = await this.client.send<PaymentType>(
      { type: 'update-payment' },
      updatePaymentInternalInput,
    );
    return response.toPromise();
  }

  public async deletePayment(
    deletePaymentInput: DeletePaymentInput,
  ): Promise<PaymentType> {
    const response = await this.client.send<PaymentType>(
      { type: 'delete-payment' },
      deletePaymentInput,
    );
    return response.toPromise();
  }

  public async getPaymentById(
    getPaymentByIdInput: GetPaymentByIdInput,
  ): Promise<PaymentType> {
    const response = await this.client.send<PaymentType>(
      { type: 'get-payment' },
      getPaymentByIdInput,
    );
    return response.toPromise();
  }

  public async getAllUserPayments(
    getAllUserPaymentInternalInput: GetAllUserPaymentInternalInput,
  ): Promise<PaymentType[]> {
    const response = await this.client.send<PaymentType[]>(
      { type: 'get-all-user-payments' },
      getAllUserPaymentInternalInput,
    );
    return response.toPromise();
  }
}
