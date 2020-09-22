import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Color } from './color-data/color.entity';
import { ColorController } from './color.controller';
import { ColorService } from './color.service';

@Module({
  imports: [TypeOrmModule.forFeature([Color])],
  controllers: [ColorController],
  providers: [ColorService],
})
export class ColorModule {}
