import { Module } from '@nestjs/common';
import { MakeController } from './make.controller';
import { MakeService } from './make.service';

@Module({
  controllers: [MakeController],
  providers: [MakeService],
})
export class MakeModule {}
