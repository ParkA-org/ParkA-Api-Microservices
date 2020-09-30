import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfirmEmail } from './entities/confirm-email.entity';

@Module({
  providers: [EmailService],
  controllers: [EmailController],
  imports: [TypeOrmModule.forFeature([User, ConfirmEmail])],
})
export class EmailModule {}
