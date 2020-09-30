import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    EmailModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.URL_DB,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      synchronize: true,
      entities: [],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
