import { Module } from '@nestjs/common';
import { AuthModule } from './auth-service/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { VehicleModule } from './vehicle-service/vehicle/vehicle.module';
import { BodyStyleModule } from './vehicle-service/body-style/body-style.module';
import { ModelModule } from './vehicle-service/model/model.module';
import { MakeModule } from './vehicle-service/make/make.module';
import { ColorModule } from './vehicle-service/color/color.module';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email-service/email.module';
import { PaymentModule } from './payment-service/payment/payment.module';
import { CardModule } from './payment-service/card/card.module';
import { ReservationModule } from './core-service/reservation/reservation.module';
import { UserInformationModule } from './core-service/user-information/user-information.module';
import { NationalityModule } from './core-service/nationality/nationality.module';
import { CountryModule } from './core-service/country/country.module';
import { ParkingModule } from './parking-service/parking/parking.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => ({ headers: req.headers }),
    }),
    VehicleModule,
    AuthModule,
    BodyStyleModule,
    ModelModule,
    MakeModule,
    ColorModule,
    EmailModule,
    PaymentModule,
    CardModule,
    ReservationModule,
    UserInformationModule,
    EmailModule,
    NationalityModule,
    CountryModule,
    ParkingModule,
  ],
  providers: [],
})
export class AppModule {}
