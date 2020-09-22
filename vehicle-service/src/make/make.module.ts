import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Make } from './make-data/make.entity';
import { MakeController } from './make.controller';
import { MakeService } from './make.service';

@Module({
  imports: [TypeOrmModule.forFeature([Make])],
  controllers: [MakeController],
  providers: [MakeService],
})
export class MakeModule {}
