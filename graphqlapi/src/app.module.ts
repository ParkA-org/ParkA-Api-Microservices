import { Module } from '@nestjs/common';
import { AuthServiceModule } from './auth-service/auth-service.module';
import { GraphQLModule } from '@nestjs/graphql';
import { VehicleServiceModule } from './vehicle-service/vehicle/vehicle-service.module';
import { VehicleTypeModule } from './vehicle-service/vehicle-type/vehicle-type.module';
import { VehicleModelModule } from './vehicle-service/vehicle-model/vehicle-model.module';
import { VehicleMakeModule } from './vehicle-service/vehicle-make/vehicle-make.module';
import { VehicleColorModule } from './vehicle-service/colors/color.module';
@Module({
  imports: [
    GraphQLModule.forRoot({ autoSchemaFile: true }),
    VehicleServiceModule,
    AuthServiceModule,
    VehicleTypeModule,
    VehicleModelModule,
    VehicleMakeModule,
    VehicleColorModule,
  ],
})
export class AppModule {}
