import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nationality } from './entities/nationality.entity';
import { NationalityController } from './nationality.controller';
import { NationalityService } from './nationality.service';

@Module({
  imports: [TypeOrmModule.forFeature([Nationality])],
  controllers: [NationalityController],
  providers: [NationalityService],
})
export class NationalityModule {}
