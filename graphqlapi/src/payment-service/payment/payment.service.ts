import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { CreatePaymentInput } from './inputs/create-payment.input';
import { DeletePaymentInput } from './inputs/delete-payment.input';
import { GetPaymentByIdInput } from './inputs/get-payment-by-id.input';
import { PaymentType } from './types/payment.type';

@Injectable()
export class PaymentService {
  @Client({
    transport: Transport.REDIS,
    options: {
      url: 'redis://redis-parka-microservices:6379',
    },
  })
  private client: ClientProxy;

  public async createPayment(
    createPaymentInput: CreatePaymentInput,
  ): Promise<PaymentType> {
    const response = await this.client.send<PaymentType>(
      { type: 'create-payment' },
      createPaymentInput,
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
}
