import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { DeletePaymentDto } from './dtos/delete-payment.dto';
import { GetPaymentByIdDto } from './dtos/get-payment-by-id.dto';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @MessagePattern({ type: 'create-payment' })
  public async createPayment(
    createPaymentDto: CreatePaymentDto,
  ): Promise<Payment> {
    return await this.paymentService.createPayment(createPaymentDto);
  }

  @MessagePattern({ type: 'delete-payment' })
  public async deletePayment(
    deletePaymentDto: DeletePaymentDto,
  ): Promise<Payment> {
    return await this.paymentService.deletePayment(deletePaymentDto);
  }

  @MessagePattern({ type: 'get-payment' })
  public async getPaymentById(
    getPaymentByIdDto: GetPaymentByIdDto,
  ): Promise<Payment> {
    return await this.paymentService.getPaymentById(getPaymentByIdDto);
  }
}
