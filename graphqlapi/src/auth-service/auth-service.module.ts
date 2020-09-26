import { Module } from '@nestjs/common';
import { AuthServiceResolver } from './auth-service.resolver';
import { AuthServiceService } from './auth-service.service';
import { AuthGuard } from './strategy/auth.guard';

@Module({
  imports: [],
  providers: [AuthServiceService, AuthServiceResolver],
  exports: [AuthGuard],
})
export class AuthServiceModule {}
