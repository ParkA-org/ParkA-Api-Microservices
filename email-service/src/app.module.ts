import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from './email/email.module';
import { ConfirmEmail } from './email/entities/confirm-email.entity';
import { ResetPassword } from './email/entities/reset-password.entity';
import { User } from './email/entities/user.entity';
import { Credential } from './email/entities/credential.entity';

@Module({
  imports: [
    EmailModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: `${process.env.MONGODB_CONNECTION_STRING}`,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      synchronize: true,
      entities: [ConfirmEmail, User, ResetPassword, Credential],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
