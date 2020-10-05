import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}
  
  @MessagePattern({ type: 'create-payment' })
  public async createPayment(
    createPaymentDto: ,
  ): Promise<Payment> {
    return await this.paymentService.createPayment(createPaymentDto);
  }
}
