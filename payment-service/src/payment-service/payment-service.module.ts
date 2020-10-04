import { Module } from '@nestjs/common';
import { PaymentServiceService } from './payment-service.service';
import { PaymentServiceController } from './payment-service.controller';

@Module({
  providers: [PaymentServiceService],
  controllers: [PaymentServiceController]
})
export class PaymentServiceModule {}
