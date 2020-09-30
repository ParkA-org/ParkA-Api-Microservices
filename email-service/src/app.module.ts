import { Module } from '@nestjs/common';
import { EmailModule } from './email/email.module';
import { EmailService } from './email/email.service';

@Module({
  imports: [EmailModule],
  controllers: [],
  providers: [EmailService],
})
export class AppModule {}
