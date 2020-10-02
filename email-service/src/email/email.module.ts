import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfirmEmail } from './entities/confirm-email.entity';
import { ResetPassword } from './entities/reset-password.entity';
import { Credential } from './entities/credential.entity';

@Module({
  providers: [EmailService],
  controllers: [EmailController],
  imports: [
    TypeOrmModule.forFeature([User, ConfirmEmail, ResetPassword, Credential]),
  ],
})
export class EmailModule {}
