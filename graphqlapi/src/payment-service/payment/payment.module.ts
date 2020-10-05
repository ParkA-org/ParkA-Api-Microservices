import { Module } from '@nestjs/common';
import { CardModule } from '../card/card.module';
import { PaymentResolver } from './payment.resolver';
import { PaymentService } from './payment.service';

@Module({
  imports: [CardModule],
  providers: [PaymentResolver, PaymentService],
})
export class PaymentModule {}
