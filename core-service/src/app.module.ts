import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservation/entities/reservation.entity';
import { ReservationModule } from './reservation/reservation.module';
import { InformationModule } from './information/information.module';

@Module({
  imports: [
    ReservationModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url:
        'mongodb+srv://parkaApiUser:vUrmea2Sp4SSCBWj@parkawebapimicroservice.br7y0.mongodb.net/ParkaMicroservices?retryWrites=true&w=majority',
      useUnifiedTopology: true,
      useNewUrlParser: true,
      synchronize: true,
      entities: [Reservation],
    }),
    InformationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
