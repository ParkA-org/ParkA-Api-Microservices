import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BodyStyle } from './entities/body-style.entity';
import { BodyStyleController } from './body-style.controller';
import { BodyStyleService } from './body-style.service';

@Module({
  imports: [TypeOrmModule.forFeature([BodyStyle])],
  controllers: [BodyStyleController],
  providers: [BodyStyleService],
})
export class BodyStyleModule {}
