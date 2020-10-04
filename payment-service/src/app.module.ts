import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentServiceModule } from './payment-service/payment-service.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [PaymentServiceModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
