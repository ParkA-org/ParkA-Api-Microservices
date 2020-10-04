import { Module } from '@nestjs/common';
import { PaymentServiceService } from './payment-service.service';

@Module({
  providers: [PaymentServiceService]
})
export class PaymentServiceModule {}
