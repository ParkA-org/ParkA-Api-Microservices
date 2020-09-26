import { Module } from '@nestjs/common';
import { AuthServiceModule } from './auth-service/auth-service.module';
import { GraphQLModule } from '@nestjs/graphql';
import { VehicleServiceModule } from './vehicle-service/vehicle/vehicle-service.module';
import { BodyStyleModule } from './vehicle-service/body-style/body-style.module';
import { ModelModule } from './vehicle-service/model/model.module';
import { MakeModule } from './vehicle-service/make/make.module';
import { ColorModule } from './vehicle-service/color/color.module';
@Module({
  imports: [
    GraphQLModule.forRoot({ autoSchemaFile: true }),
    VehicleServiceModule,
    AuthServiceModule,
    BodyStyleModule,
    ModelModule,
    MakeModule,
    ColorModule,
  ],
})
export class AppModule {}
