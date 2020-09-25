import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './vehicle/entities/vehicle.entity';
import { VehicleModule } from './vehicle/vehicle.module';
import { ModelModule } from './model/model.module';
import { VehicleTypeModule } from './vehicle-type/vehicle-type.module';
import { ColorModule } from './color/color.module';
import { MakeModule } from './make/make.module';
import { VehicleType } from './vehicle-type/entities/vehicle-type.entity';
import { Model } from './model/entities/model.entity';
import { Make } from './make/entities/make.entity';
import { Color } from './color/entities/color.entity';

@Module({
  imports: [
    VehicleModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url:
        'mongodb+srv://parkaApiUser:vUrmea2Sp4SSCBWj@parkawebapimicroservice.br7y0.mongodb.net/ParkaMicroservices?retryWrites=true&w=majority',
      useUnifiedTopology: true,
      useNewUrlParser: true,
      synchronize: true,
      entities: [Vehicle, VehicleType, Model, Make, Color],
    }),
    ModelModule,
    VehicleTypeModule,
    ColorModule,
    MakeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
