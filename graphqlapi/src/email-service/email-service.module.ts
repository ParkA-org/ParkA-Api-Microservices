import { Module } from '@nestjs/common';
import { EmailServiceService } from './email-service.service';

@Module({
  providers: [EmailServiceService, EmailServiceResolver],
})
export class EmailServiceModule {}
