import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { PaymentModule } from './payment/payment.module';
import { CardService } from './card/card.service';
import { CarController } from './car/car.controller';
import { CardController } from './card/card.controller';
import { CardModule } from './card/card.module';

@Module({
  imports: [
    PaymentModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    CardModule,
  ],
  controllers: [CarController, CardController],
  providers: [CardService],
})
export class AppModule {}
