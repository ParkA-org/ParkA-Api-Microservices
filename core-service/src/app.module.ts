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
import { ConfigModule } from '@nestjs/config';
import { CalendarModule } from './calendar/calendar.module';
import { ParkingCalendar } from './calendar/entities/calendar.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ReservationModule,
    UserInformationModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: `${process.env.MONGODB_CONNECTION_STRING}`,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      synchronize: true,
      entities: [
        Reservation,
        UserInformation,
        Nationality,
        Country,
        ParkingCalendar,
      ],
    }),
    NationalityModule,
    CountryModule,
    CalendarModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
