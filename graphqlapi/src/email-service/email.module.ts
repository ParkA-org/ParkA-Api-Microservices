import { Module } from '@nestjs/common';
import { EmailServiceResolver } from './email.resolver';
import { EmailServiceService } from './email.service';

@Module({
  providers: [EmailServiceService, EmailServiceResolver],
})
export class EmailServiceModule {}
