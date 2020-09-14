import { Module } from '@nestjs/common';
import { AuthServiceModule } from './auth-service/auth-service.module';

@Module({
  imports: [AuthServiceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
