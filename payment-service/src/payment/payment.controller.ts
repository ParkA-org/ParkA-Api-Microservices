import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreatePaymentDto } from './dtos/create-payment.dto';
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
}
