import { Module } from '@nestjs/common';
import { EmailServiceResolver } from './email-service.resolver';
import { EmailServiceService } from './email-service.service';

@Module({
  providers: [EmailServiceService, EmailServiceResolver],
})
export class EmailServiceModule {}
