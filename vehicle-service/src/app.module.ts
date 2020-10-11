import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './vehicle/entities/vehicle.entity';
import { VehicleModule } from './vehicle/vehicle.module';
import { ModelModule } from './model/model.module';
import { BodyStyleModule } from './body-style/body-style.module';
import { ColorModule } from './color/color.module';
import { MakeModule } from './make/make.module';
import { BodyStyle } from './body-style/entities/body-style.entity';
import { Model } from './model/entities/model.entity';
import { Make } from './make/entities/make.entity';
import { Color } from './color/entities/color.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    VehicleModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: `${process.env.MONGODB_CONNECTION_STRING}`,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      synchronize: true,
      entities: [Vehicle, BodyStyle, Model, Make, Color],
    }),
    ModelModule,
    BodyStyleModule,
    ColorModule,
    MakeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
