import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservation/entities/reservation.entity';
import { ReservationModule } from './reservation/reservation.module';
import { UserInformationModule } from './user-information/user-information.module';
import { UserInformation } from './user-information/entities/user-information.entities';
import { NationalityModule } from './nationality/nationality.module';
import { Nationality } from './nationality/entities/nationality.entity';
import { CountryModule } from './country/country.module';
import { Country } from './country/entities/country.entity';

@Module({
  imports: [
    ReservationModule,
    UserInformationModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url:
        'mongodb+srv://parkaApiUser:vUrmea2Sp4SSCBWj@parkawebapimicroservice.br7y0.mongodb.net/ParkaMicroservices?retryWrites=true&w=majority',
      useUnifiedTopology: true,
      useNewUrlParser: true,
      synchronize: true,
      entities: [Reservation, UserInformation, Nationality, Country],
    }),
    NationalityModule,
    CountryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
