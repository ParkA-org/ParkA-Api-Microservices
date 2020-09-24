import { Module } from '@nestjs/common';
import { AuthServiceModule } from './auth-service/auth-service.module';
import { GraphQLModule } from '@nestjs/graphql';
import { VehicleServiceModule } from './vehicle-service/vehicle/vehicle-service.module';
import { VehicleTypeModule } from './vehicle-service/vehicle-type/vehicle-type.module';
import { ModelModule } from './vehicle-service/model/model.module';
import { MakeModule } from './vehicle-service/make/make.module';
import { ColorModule } from './vehicle-service/color/color.module';
@Module({
  imports: [
    GraphQLModule.forRoot({ autoSchemaFile: true }),
    VehicleServiceModule,
    AuthServiceModule,
    VehicleTypeModule,
    ModelModule,
    MakeModule,
    ColorModule,
  ],
})
export class AppModule {}
