import { Module } from '@nestjs/common';
import { AuthServiceModule } from './auth-service/auth-service.module';
import { GraphQLModule } from '@nestjs/graphql';
@Module({
  imports: [
    AuthServiceModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => ({ headers: req.headers }),
    }),
  ],
})
export class AppModule {}
