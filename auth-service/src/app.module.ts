import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
