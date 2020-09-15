import { Module } from '@nestjs/common';
import { AuthServiceResolver } from './auth-service.resolver';
import { AuthServiceService } from './auth-service.service';

@Module({
  providers: [AuthServiceService, AuthServiceResolver],
  exports: [],
})
export class AuthServiceModule {}
