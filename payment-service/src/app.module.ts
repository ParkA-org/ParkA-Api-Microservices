import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentServiceModule } from './payment-service/payment-service.module';

@Module({
  imports: [PaymentServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
