import { Module } from '@nestjs/common';
import { EmailResolver } from './email.resolver';
import { EmailService } from './email.service';

@Module({
  providers: [EmailService, EmailResolver],
})
export class EmailModule {}
