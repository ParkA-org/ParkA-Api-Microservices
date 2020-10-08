import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';
import { Credential } from './auth/entities/credential.entity';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: `${process.env.MONGODB_CONNECTION_STRING}`,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      synchronize: true,
      entities: [User, Credential],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
