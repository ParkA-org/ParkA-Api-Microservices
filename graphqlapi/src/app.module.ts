import { Module } from '@nestjs/common';
import { AuthServiceModule } from './auth-service/auth-service.module';
import { GraphQLModule } from '@nestjs/graphql';
import { VehicleServiceModule } from './vehicle-service/vehicle-service.module';
@Module({
  imports: [
    AuthServiceModule,
    GraphQLModule.forRoot({ autoSchemaFile: true }),
    VehicleServiceModule,
  ],
})
export class AppModule {}
